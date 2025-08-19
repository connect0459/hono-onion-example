import { UserController } from "../presentation/controllers/user-controller";
import { UserUseCase } from "../application/usecases/user-usecase";
import { InMemoryUserRepository } from "../infrastructure/persistence/in-memory-user-repository";
import { UserRepository } from "../domain/repositories/user-repository";
import { IUserUseCase } from "../application/interfaces/user-usecase-interface";
import { IUserController } from "../presentation/interfaces/user-controller-interface";

export class Registry {
  private static _userController: IUserController;

  static get userController(): IUserController {
    if (this._userController === undefined) {
      const userRepository: UserRepository = new InMemoryUserRepository();
      const userUseCase: IUserUseCase = new UserUseCase(userRepository);
      this._userController = new UserController(userUseCase);
    }
    return this._userController;
  }
}
