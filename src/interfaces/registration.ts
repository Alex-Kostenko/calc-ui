import { IEntity } from "./entity";

export interface IRegistration extends IEntity {
  values: IPercentByValue[];
}

export interface IPercentByValue {
  threshold: number;
  percent: number;
}
