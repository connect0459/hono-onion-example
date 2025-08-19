import { User } from "../entities/user";

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, userData: Partial<{ name: string; email: string }>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
