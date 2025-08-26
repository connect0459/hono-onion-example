import { User, createUser } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user-repository";

export const createInMemoryUserRepository = (): UserRepository => {
  const users: Map<string, User> = new Map();

  return {
    save: async (user: User): Promise<User> => {
      users.set(user.id, user);
      return Promise.resolve(user);
    },

    findById: async (id: string): Promise<User | null> => {
      return Promise.resolve(users.get(id) ?? null);
    },

    findAll: async (): Promise<User[]> => {
      return Promise.resolve(Array.from(users.values()));
    },

    update: async (
      id: string,
      userData: Partial<{ name: string; email: string }>
    ): Promise<User | null> => {
      const existingUser = users.get(id);
      if (existingUser === undefined) {
        return Promise.resolve(null);
      }

      const updatedUser = createUser(
        id,
        userData.name ?? existingUser.name,
        userData.email ?? existingUser.email
      );

      users.set(updatedUser.id, updatedUser);
      return Promise.resolve(updatedUser);
    },

    delete: async (id: string): Promise<boolean> => {
      return Promise.resolve(users.delete(id));
    },
  };
};
