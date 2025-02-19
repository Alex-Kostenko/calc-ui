import { IEntity } from "./entity";
import { ILocation } from "./location";
import { ITax } from "./tax";

export interface AuctionTax extends IEntity {
  tax: ITax[];
}

export interface IAuction extends IEntity {
  name: string;
  locations: ILocation[];
  auction_tax: AuctionTax;
}
