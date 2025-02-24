import { useGetFormulaByNameQuery } from "@/store/api";
import { useAppSelector } from ".";
import { ICoefficient } from "@/interfaces/coefficient";

const dbValuePattern = /^([^:]+)(?::([^:]+))+$/;
const operations = "()+-*/";

const isNumber = (str: string): boolean => {
  if (!str) return false;
  return !isNaN(Number(str));
};

export function useFormula(name: string) {
  const { data, isError } = useGetFormulaByNameQuery(name);

  const { user, carYear, fuelType, volume } = useAppSelector(
    (state) => state.total
  );
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
      // TODO: move to strapi as a table
      if (fuelType === "diesel") {
        return volume && volume >= 3500 ? 150 : 75;
      } else if (fuelType === "gasoline") {
        return volume && volume >= 3000 ? 100 : 50;
      }
      return volume;
    },
  };

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
            const value = user?.coefficient[tokens[1] as keyof ICoefficient];

            return value
              ? value?.value * (value?.is_percent ? 0.01 : 1)
              : "undefined";
          }
        }
        if (isNumber(token) || operations.includes(token)) {
          return token;
        }
        return total[token as keyof typeof total] || "undefined";
      })
      .join(" ");

  const execFormula = new Function(`return Math.round(${formula}) || ""`);

  return [execFormula, formula, initFormula] as const;
}
