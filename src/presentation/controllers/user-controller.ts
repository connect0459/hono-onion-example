import { Context } from "hono";
import { IUserUseCase } from "../../application/interfaces/user-usecase-interface";
import { IUserController } from "../interfaces/user-controller-interface";
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
  MessageResponseDto,
  UserListResponseDto,
} from "../../application/dtos/user-dto";
import {
  UserNotFoundException,
  ValidationException,
} from "../../domain/exceptions/user-exceptions";

export class UserController implements IUserController {
  constructor(private userUseCase: IUserUseCase) {}

  async createUser(c: Context) {
    const body = (await c.req.json()) as unknown;

    if (!CreateUserRequestDto.isValid(body)) {
      throw new ValidationException("Invalid request data");
    }

    const requestDto = CreateUserRequestDto.fromUnknown(body);
    const user = await this.userUseCase.createUser({
      id: requestDto.id,
      name: requestDto.name,
      email: requestDto.email,
    });

    const responseDto = UserResponseDto.fromUser(user);
    return c.json(responseDto, 201);
  }

  async getUserById(c: Context) {
    const id = c.req.param("id");
    const user = await this.userUseCase.getUserById(id);

    if (user === null) {
      throw new UserNotFoundException(id);
    }

    const responseDto = UserResponseDto.fromUser(user);
    return c.json(responseDto);
  }

  async getAllUsers(c: Context) {
    const users = await this.userUseCase.getAllUsers();
    const responseDto = UserListResponseDto.fromUsers(users);
    return c.json(responseDto);
  }

  async updateUser(c: Context) {
    const id = c.req.param("id");
    const body = (await c.req.json()) as unknown;

    if (!UpdateUserRequestDto.isValid(body)) {
      throw new ValidationException("Invalid request data");
    }

    const requestDto = UpdateUserRequestDto.fromUnknown(body);
    const user = await this.userUseCase.updateUser(id, {
      name: requestDto.name,
      email: requestDto.email,
    });

    if (user === null) {
      throw new UserNotFoundException(id);
    }

    const responseDto = UserResponseDto.fromUser(user);
    return c.json(responseDto);
  }

  async deleteUser(c: Context) {
    const id = c.req.param("id");
    const deleted = await this.userUseCase.deleteUser(id);

    if (deleted === false) {
      throw new UserNotFoundException(id);
    }

    const responseDto = new MessageResponseDto("User deleted successfully");
    return c.json(responseDto);
  }
}
