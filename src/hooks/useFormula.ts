import { useGetFormulaByNameQuery } from "@/store/api";
import { useAppSelector } from ".";

const dbValuePattern = /^([^:]+)(?::([^:]+))+$/;
const numericPattern = /^[0-9]+$/;
const operations = "+-*/";

export function useFormula(name: string) {
  const { data, isError } = useGetFormulaByNameQuery(name);
  const { user } = useAppSelector((state) => state.total);

  if (isError) {
    throw new Error("Can't find formula with name " + name);
  }

  const initFormula = data?.data?.[0]?.function;

  const formula =
    initFormula &&
    initFormula
      .split(" ")
      .map((token) => {
        if (dbValuePattern.test(token)) {
          return token
            .split(":")
            .reduce(
              (acc, key) => (acc ? acc[key as keyof typeof user] : undefined),
              user
            );
        }
        if (numericPattern.test(token) || operations.includes(token)) {
          return token;
        }
        return user ? user[token as keyof typeof user] : "0";
      })
      .join(" ");

  const execFormula = new Function(`return ${formula}`);

  return [execFormula, formula, initFormula] as const;
}
