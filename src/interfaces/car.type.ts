import { IEntity } from "./entity";
import { IImage } from "./image";

export interface ICarType extends IEntity {
  name: string;
  price: number;
  image: IImage;
}
