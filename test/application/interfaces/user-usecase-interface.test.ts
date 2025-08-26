import { describe, it, expect } from "vitest";
import { IUserUseCase } from "../../../src/application/interfaces/user-usecase-interface";
import { User, createUser } from "../../../src/domain/entities/user";

describe("IUserUseCase Interface", () => {
  it("should define correct method signatures", () => {
    const mockUseCase: IUserUseCase = {
      createUser: async (userData: { id: string; name: string; email: string }): Promise<User> => {
        return Promise.resolve(createUser(userData.id, userData.name, userData.email));
      },
      getUserById: async (): Promise<User | null> => Promise.resolve(null),
      getAllUsers: async (): Promise<User[]> => Promise.resolve([]),
      updateUser: async (): Promise<User | null> => Promise.resolve(null),
      deleteUser: async (): Promise<boolean> => Promise.resolve(false),
    };

    expect(typeof mockUseCase.createUser).toBe("function");
    expect(typeof mockUseCase.getUserById).toBe("function");
    expect(typeof mockUseCase.getAllUsers).toBe("function");
    expect(typeof mockUseCase.updateUser).toBe("function");
    expect(typeof mockUseCase.deleteUser).toBe("function");
  });
});
