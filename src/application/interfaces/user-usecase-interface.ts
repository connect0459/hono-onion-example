import { User } from "../../domain/entities/user";

export type IUserUseCase = {
  readonly createUser: (userData: { id: string; name: string; email: string }) => Promise<User>;
  readonly getUserById: (id: string) => Promise<User | null>;
  readonly getAllUsers: () => Promise<User[]>;
  readonly updateUser: (
    id: string,
    userData: Partial<{ name: string; email: string }>
  ) => Promise<User | null>;
  readonly deleteUser: (id: string) => Promise<boolean>;
};
