import { createUserController } from "../presentation/controllers/user-controller";
import { createUserUseCase } from "../application/usecases/user-usecase";
import { createInMemoryUserRepository } from "../infrastructure/persistence/in-memory-user-repository";
import { UserRepository } from "../domain/repositories/user-repository";
import { IUserUseCase } from "../application/interfaces/user-usecase-interface";
import { IUserController } from "../presentation/interfaces/user-controller-interface";

type Registry = {
  readonly userController: IUserController;
};

export const createRegistry = (): Registry => {
  const userRepository: UserRepository = createInMemoryUserRepository();
  const userUseCase: IUserUseCase = createUserUseCase(userRepository);
  const userController: IUserController = createUserController(userUseCase);

  return {
    userController,
  };
};

// Singleton instance for convenience
export const registry = createRegistry();
