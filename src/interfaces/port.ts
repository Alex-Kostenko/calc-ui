import { IEntity } from "./entity";
import { ILocation } from "./location";
import { IState } from "./state";

export interface IPort extends IEntity {
  name: string;
  states: IState[];
  locations: ILocation[];
}
