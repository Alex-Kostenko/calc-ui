import { Auction } from "./auction";
import { Entity } from "./entity";
import { Port } from "./port";
import { State } from "./state";

export interface Location extends Entity {
  name: string;
  price: number;
  port: Port;
  state: State;
  auctions: Auction[];
}
