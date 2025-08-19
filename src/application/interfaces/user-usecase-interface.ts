import { User } from "../../domain/entities/user";

export interface IUserUseCase {
  createUser(userData: { id: string; name: string; email: string }): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, userData: Partial<{ name: string; email: string }>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
