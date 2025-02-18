import { Entity } from "./entity";
import { Location } from "./location";
import { State } from "./state";

export interface Port extends Entity {
  name: string;
  states: State[];
  locations: Location[];
}
