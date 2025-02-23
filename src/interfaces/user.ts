import { IEntity } from "./entity";
import { Role } from "./role";

export interface IUser extends IEntity {
  // name: string;
  // lastname: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  blocked: boolean;
  confirmed: boolean;
}
