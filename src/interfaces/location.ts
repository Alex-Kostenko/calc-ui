import { IAuction } from "./auction";
import { IEntity } from "./entity";
import { IPort } from "./port";
import { IState } from "./state";

export interface ILocation extends IEntity {
  name: string;
  price: number;
  port: IPort;
  state: IState;
  auctions: IAuction[];
}
