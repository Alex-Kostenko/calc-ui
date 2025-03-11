import { useGetFormulaByNameQuery } from "@/store/api";
import { useAppSelector } from ".";
import { ICoef } from "@/interfaces/coefficient";
import { IUser } from "@/interfaces";

const dbValuePattern = /^([^:]+)(?::([^:]+))+$/;
const operations = "()+-*/><?:";

const isNumber = (str: string): boolean => {
  if (!str) return false;
  return !isNaN(Number(str));
};

export function useFormula(name: string, user: IUser) {
  const { data, isError } = useGetFormulaByNameQuery(name);

  const { carYear, fuelType, volume, fuelCost, auctionBids, carPrice } =
    useAppSelector((state) => state.total);
  const total = useAppSelector((state) => state.total);

  if (isError) {
    throw new Error("Can't find formula with name " + name);
  }

  const initFormula = data?.data?.[0]?.function;

  const ui = {
    year: () => {
      const year = carYear && new Date().getFullYear() - carYear;
      if (!year) return year;
      return year > 15 ? 15 : year - 1;
    },
    fuel: () => {
      if (!fuelType || !fuelCost || !volume) return undefined;
      const cost = fuelCost[fuelType];

      return Math.round(volume >= cost.amount ? cost.max : cost.min);
    },
    bid: () => {
      if (!carPrice || !auctionBids) return undefined;

      const bids = [...auctionBids].sort((a, b) => a.amount - b.amount);
      if (!bids) return undefined;

      const currentBid = bids.find((b) => b.amount >= carPrice);

      if (!currentBid) return undefined;

      return currentBid.bid;
    },
  };

  function calculate(value: number | undefined, coefName: ICoef["field"]) {
    if (!value && value !== 0) return "";

    const coef = user?.coefficient.coef.find((c) => c.field === coefName);

    if (!coef) return value;

    return coef.isPercent ? value * coef.value : value + coef.value;
  }

  const formula =
    initFormula &&
    initFormula
      .split(" ")
      .map((token) => {
        if (dbValuePattern.test(token)) {
          const tokens = token.split(":");
          if (tokens[0] === "ui") {
            return `${ui[tokens[1] as keyof typeof ui]()}`;
          }
          if (tokens[0] === "coefficient") {
            const value = user?.coefficient.coef.find(
              (c) => c.field === tokens[1]
            );

            return value && value.value
              ? value?.value * (value?.isPercent ? 0.01 : 1)
              : "1";
          }
        }
        if (isNumber(token) || operations.includes(token)) {
          return token;
        }
        if (token.includes(":")) {
          const tokens = token.split(":");

          const isTokenCoef = tokens.some((t) =>
            user?.coefficient.coef.find((c) => c.field === t)
          );

          if (isTokenCoef) {
            return calculate(
              (tokens.reduce(
                (acc, key) =>
                  acc && key in acc
                    ? (acc[key as keyof typeof total] as any)
                    : undefined,
                total
              ) as unknown as number) ?? 0,
              tokens[tokens.length - 1] as ICoef["field"]
            );
          }
          return (
            tokens.reduce(
              (acc, key) =>
                acc && key in acc
                  ? (acc[key as keyof typeof total] as any)
                  : undefined,
              total
            ) ?? "0"
          );
        }

        const isTokenCoef = user?.coefficient.coef.find(
          (c) => c.field === token
        );

        if (isTokenCoef) {
          return (
            calculate(
              (total[token as keyof typeof total] as unknown as number) ||
                undefined,
              token as ICoef["field"]
            ) || "undefined"
          );
        }

        return total[token as keyof typeof total] || "undefined";
      })
      .join(" ");

  const execFormula = new Function(
    `return isNaN(Number(${formula})) || ${formula} === 'undefined' ? "" : Math.round(${formula})`
  );

  return [execFormula, formula, initFormula] as const;
}
