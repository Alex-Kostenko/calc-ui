import { IEntity } from "./entity";
import { ILocation } from "./location";

export interface IState extends IEntity {
  name: string;
  price: number;
  locations: ILocation[];
}
