import { Entity } from "./entity";
import { Location } from "./location";
import { Port } from "./port";

export interface State extends Entity {
  name: string;
  price: number;
  port: Port;
  locations: Location[];
}
