import { describe, it, expect, vi } from "vitest";
import { IUserController } from "../../../src/presentation/interfaces/user-controller-interface";

describe("IUserController Interface", () => {
  it("should define correct method signatures", () => {
    const mockController: IUserController = {
      createUser: vi.fn(),
      getUserById: vi.fn(),
      getAllUsers: vi.fn(),
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
    };

    expect(typeof mockController.createUser).toBe("function");
    expect(typeof mockController.getUserById).toBe("function");
    expect(typeof mockController.getAllUsers).toBe("function");
    expect(typeof mockController.updateUser).toBe("function");
    expect(typeof mockController.deleteUser).toBe("function");
  });
});
