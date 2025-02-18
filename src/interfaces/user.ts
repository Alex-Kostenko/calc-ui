import { Entity } from "./entity";
import { Role } from "./role";

export interface User extends Entity {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}
