import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<User> {
    this.users.set(user.id(), user);
    return Promise.resolve(user);
  }

  async findById(id: string): Promise<User | null> {
    return Promise.resolve(this.users.get(id) ?? null);
  }

  async findAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.users.values()));
  }

  async update(
    id: string,
    userData: Partial<{ name: string; email: string }>
  ): Promise<User | null> {
    const existingUser = this.users.get(id);
    if (existingUser === undefined) {
      return Promise.resolve(null);
    }

    const updatedUser = new User(
      id,
      userData.name ?? existingUser.name(),
      userData.email ?? existingUser.email()
    );

    this.users.set(updatedUser.id(), updatedUser);
    return Promise.resolve(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    return Promise.resolve(this.users.delete(id));
  }
}
