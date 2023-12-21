import { Entity } from "./entity";

export interface User extends Entity {
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
