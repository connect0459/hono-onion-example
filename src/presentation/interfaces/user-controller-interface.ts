import { Context } from "hono";

export interface IUserController {
  createUser(c: Context): Promise<Response>;
  getUserById(c: Context): Promise<Response>;
  getAllUsers(c: Context): Promise<Response>;
  updateUser(c: Context): Promise<Response>;
  deleteUser(c: Context): Promise<Response>;
}
