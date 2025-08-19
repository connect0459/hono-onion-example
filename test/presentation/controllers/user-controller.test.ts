import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserController } from "../../../src/presentation/controllers/user-controller";
import { IUserUseCase } from "../../../src/application/interfaces/user-usecase-interface";
import { IUserController } from "../../../src/presentation/interfaces/user-controller-interface";
import { User } from "../../../src/domain/entities/user";
import { Context } from "hono";

describe("UserController", () => {
  let userController: IUserController;
  let mockUserUseCase: IUserUseCase;

  beforeEach(() => {
    mockUserUseCase = {
      createUser: vi.fn(),
      getUserById: vi.fn(),
      getAllUsers: vi.fn(),
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
    };

    userController = new UserController(mockUserUseCase);
  });

  it("should create a user", async () => {
    const userData = { id: "1", name: "John Doe", email: "john@example.com" };
    const user = new User(userData.id, userData.name, userData.email);
    mockUserUseCase.createUser = vi.fn().mockResolvedValue(user);

    const mockContext = {
      req: { json: vi.fn().mockResolvedValue(userData) },
      json: vi.fn(),
    } as unknown as Context;

    await userController.createUser(mockContext);

    expect(mockUserUseCase.createUser).toHaveBeenCalledWith(userData);
    expect(mockContext.json).toHaveBeenCalledWith(user, 201);
  });

  it("should get user by id", async () => {
    const user = new User("1", "John Doe", "john@example.com");
    mockUserUseCase.getUserById = vi.fn().mockResolvedValue(user);

    const mockContext = {
      req: { param: vi.fn().mockReturnValue("1") },
      json: vi.fn(),
    } as unknown as Context;

    await userController.getUserById(mockContext);

    expect(mockUserUseCase.getUserById).toHaveBeenCalledWith("1");
    expect(mockContext.json).toHaveBeenCalledWith(user);
  });

  it("should return 404 when user not found", async () => {
    mockUserUseCase.getUserById = vi.fn().mockResolvedValue(null);

    const mockContext = {
      req: { param: vi.fn().mockReturnValue("1") },
      json: vi.fn(),
    } as unknown as Context;

    await userController.getUserById(mockContext);

    expect(mockContext.json).toHaveBeenCalledWith({ error: "User not found" }, 404);
  });
});
