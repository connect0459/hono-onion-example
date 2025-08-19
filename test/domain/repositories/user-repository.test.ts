import { describe, it, expect } from "vitest";
import { UserRepository } from "../../../src/domain/repositories/user-repository";
import { User } from "../../../src/domain/entities/user";

describe("UserRepository Interface", () => {
  it("should define correct method signatures", () => {
    const mockRepository: UserRepository = {
      save: async (user: User): Promise<User> => Promise.resolve(user),
      findById: async (): Promise<User | null> => Promise.resolve(null),
      findAll: async (): Promise<User[]> => Promise.resolve([]),
      update: async (): Promise<User | null> => Promise.resolve(null),
      delete: async (): Promise<boolean> => Promise.resolve(false),
    };

    expect(typeof mockRepository.save).toBe("function");
    expect(typeof mockRepository.findById).toBe("function");
    expect(typeof mockRepository.findAll).toBe("function");
    expect(typeof mockRepository.update).toBe("function");
    expect(typeof mockRepository.delete).toBe("function");
  });
});
