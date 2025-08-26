import { User, createUser } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user-repository";
import { IUserUseCase } from "../interfaces/user-usecase-interface";

export const createUserUseCase = (userRepository: UserRepository): IUserUseCase => ({
  createUser: async (userData: { id: string; name: string; email: string }): Promise<User> => {
    const user = createUser(userData.id, userData.name, userData.email);
    return await userRepository.save(user);
  },

  getUserById: async (id: string): Promise<User | null> => {
    return await userRepository.findById(id);
  },

  getAllUsers: async (): Promise<User[]> => {
    return await userRepository.findAll();
  },

  updateUser: async (
    id: string,
    userData: Partial<{ name: string; email: string }>
  ): Promise<User | null> => {
    return await userRepository.update(id, userData);
  },

  deleteUser: async (id: string): Promise<boolean> => {
    return await userRepository.delete(id);
  },
});
