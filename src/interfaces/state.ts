import { IEntity } from "./entity";
import { ILocation } from "./location";
import { IPort } from "./port";

export interface IState extends IEntity {
  name: string;
  price: number;
  port: IPort;
  locations: ILocation[];
}
