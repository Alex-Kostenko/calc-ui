import { Meta } from "./meta";

export interface IResponse<T> {
  data: T;
  meta: Meta;
}
