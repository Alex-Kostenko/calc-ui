import { ICarType } from "./car.type";
import { IEntity } from "./entity";
import { ILocation } from "./location";

export interface IPort extends IEntity {
  name: string;
  locations: ILocation[];
  car_types: ICarType[];
}
