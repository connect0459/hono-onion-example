import { User } from "../entities/user";

export type UserRepository = {
  readonly save: (user: User) => Promise<User>;
  readonly findById: (id: string) => Promise<User | null>;
  readonly findAll: () => Promise<User[]>;
  readonly update: (
    id: string,
    userData: Partial<{ name: string; email: string }>
  ) => Promise<User | null>;
  readonly delete: (id: string) => Promise<boolean>;
};
