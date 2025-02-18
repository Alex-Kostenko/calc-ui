import { Entity } from "./entity";
import { Location } from "./location";

export interface Auction extends Entity {
  name: string;
  locations: Location[];
}
