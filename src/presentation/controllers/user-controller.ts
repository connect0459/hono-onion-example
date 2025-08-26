import { Context } from "hono";
import { IUserUseCase } from "../../application/interfaces/user-usecase-interface";
import { IUserController } from "../interfaces/user-controller-interface";
import {
  isValidCreateUserRequest,
  createUserRequestFromUnknown,
  isValidUpdateUserRequest,
  updateUserRequestFromUnknown,
  userResponseFromUser,
  createMessageResponse,
  userListResponseFromUsers,
} from "../../application/dtos/user-dto";
import {
  createUserNotFoundException,
  createValidationException,
} from "../../domain/exceptions/user-exceptions";

export const createUserController = (userUseCase: IUserUseCase): IUserController => ({
  createUser: async (c: Context) => {
    const body = (await c.req.json()) as unknown;

    if (!isValidCreateUserRequest(body)) {
      throw createValidationException("Invalid request data");
    }

    const requestDto = createUserRequestFromUnknown(body);
    const user = await userUseCase.createUser({
      id: requestDto.id,
      name: requestDto.name,
      email: requestDto.email,
    });

    const responseDto = userResponseFromUser(user);
    return c.json(responseDto, 201);
  },

  getUserById: async (c: Context) => {
    const id = c.req.param("id");
    const user = await userUseCase.getUserById(id);

    if (user === null) {
      throw createUserNotFoundException(id);
    }

    const responseDto = userResponseFromUser(user);
    return c.json(responseDto);
  },

  getAllUsers: async (c: Context) => {
    const users = await userUseCase.getAllUsers();
    const responseDto = userListResponseFromUsers(users);
    return c.json(responseDto);
  },

  updateUser: async (c: Context) => {
    const id = c.req.param("id");
    const body = (await c.req.json()) as unknown;

    if (!isValidUpdateUserRequest(body)) {
      throw createValidationException("Invalid request data");
    }

    const requestDto = updateUserRequestFromUnknown(body);
    const user = await userUseCase.updateUser(id, {
      name: requestDto.name,
      email: requestDto.email,
    });

    if (user === null) {
      throw createUserNotFoundException(id);
    }

    const responseDto = userResponseFromUser(user);
    return c.json(responseDto);
  },

  deleteUser: async (c: Context) => {
    const id = c.req.param("id");
    const deleted = await userUseCase.deleteUser(id);

    if (deleted === false) {
      throw createUserNotFoundException(id);
    }

    const responseDto = createMessageResponse("User deleted successfully");
    return c.json(responseDto);
  },
});
