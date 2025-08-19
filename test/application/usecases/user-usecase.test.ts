import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserUseCase } from "../../../src/application/usecases/user-usecase";
import { UserRepository } from "../../../src/domain/repositories/user-repository";
import { User } from "../../../src/domain/entities/user";
import { IUserUseCase } from "../../../src/application/interfaces/user-usecase-interface";

describe("UserUseCase", () => {
  let userUseCase: IUserUseCase;
  let mockRepository: UserRepository;

  beforeEach(() => {
    mockRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    userUseCase = new UserUseCase(mockRepository);
  });

  it("should create a user", async () => {
    const userData = { id: "1", name: "John Doe", email: "john@example.com" };
    const user = new User(userData.id, userData.name, userData.email);
    const saveMock = vi.fn().mockResolvedValue(user);
    mockRepository.save = saveMock;

    const result = await userUseCase.createUser(userData);

    expect(saveMock).toHaveBeenCalledWith(expect.any(User));
    expect(result).toEqual(user);
  });

  it("should get user by id", async () => {
    const user = new User("1", "John Doe", "john@example.com");
    const findByIdMock = vi.fn().mockResolvedValue(user);
    mockRepository.findById = findByIdMock;

    const result = await userUseCase.getUserById("1");

    expect(findByIdMock).toHaveBeenCalledWith("1");
    expect(result).toEqual(user);
  });

  it("should get all users", async () => {
    const users = [new User("1", "John Doe", "john@example.com")];
    const findAllMock = vi.fn().mockResolvedValue(users);
    mockRepository.findAll = findAllMock;

    const result = await userUseCase.getAllUsers();

    expect(findAllMock).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
