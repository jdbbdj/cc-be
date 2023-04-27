import { IBase } from "../base.validator";

interface UserValidator extends IBase {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export type { UserValidator };
