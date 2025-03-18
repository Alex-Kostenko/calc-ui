import { SingleValue } from "react-select";

export interface ISelectOption<T = string> {
  label: string;
  value: T;
}

export type ISelectOnChangeValue<T = string> = SingleValue<ISelectOption<T>>;
