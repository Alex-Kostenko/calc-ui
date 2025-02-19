import { IEntity } from "./entity";
import { ILocation } from "./location";
import { ITax } from "./tax";

export interface IAuction extends IEntity {
  name: string;
  locations: ILocation[];
  acution_tax: ITax[];
}
