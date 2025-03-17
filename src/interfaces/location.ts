import { IAuction } from "./auction";
import { IEntity } from "./entity";
import { IPort } from "./port";
import { IState } from "./state";
import { ICarPrice } from "./car.type";

export interface ILocation extends IEntity {
  name: string;
  port: IPort;
  state: IState;
  auctions: IAuction[];
  price_by_type: ICarPrice[];
}
