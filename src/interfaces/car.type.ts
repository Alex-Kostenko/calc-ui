import { IEntity } from "./entity";
import { IImage } from "./image";

export interface ICarType extends IEntity {
  name: TCarTypes;
  image: IImage;
  packImage: IImage;
}

export type TCarTypes =
  | "minivan"
  | "sedan"
  | "crossover"
  | "big-crossover"
  | "pikup";
