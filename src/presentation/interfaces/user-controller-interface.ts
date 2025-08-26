import { Context } from "hono";

export type IUserController = {
  readonly createUser: (c: Context) => Promise<Response>;
  readonly getUserById: (c: Context) => Promise<Response>;
  readonly getAllUsers: (c: Context) => Promise<Response>;
  readonly updateUser: (c: Context) => Promise<Response>;
  readonly deleteUser: (c: Context) => Promise<Response>;
};
