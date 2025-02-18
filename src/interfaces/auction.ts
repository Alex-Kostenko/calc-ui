import { IEntity } from "./entity";
import { ILocation } from "./location";

export interface IAuction extends IEntity {
  name: string;
  locations: ILocation[];
}
