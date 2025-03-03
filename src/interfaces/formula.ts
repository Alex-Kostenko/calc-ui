import { IEntity } from "./entity";

export interface IFormula extends IEntity {
  name: string;
  function: string;
}
