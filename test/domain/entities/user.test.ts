import { describe, it, expect } from "vitest";
import { createUser, createUserFromObject } from "../../../src/domain/entities/user";

describe("User", () => {
  describe("createUser", () => {
    it("should create a user with valid data", () => {
      const user = createUser("1", "John Doe", "john@example.com");

      expect(user.id).toBe("1");
      expect(user.name).toBe("John Doe");
      expect(user.email).toBe("john@example.com");
    });

    it("should throw error when email is invalid", () => {
      expect(() => {
        createUser("1", "John Doe", "invalid-email");
      }).toThrow("Invalid email format");
    });

    it("should throw error when name is empty", () => {
      expect(() => {
        createUser("1", "", "john@example.com");
      }).toThrow("Name is required");
    });
  });

  describe("createUserFromObject", () => {
    it("should create a user from valid object", () => {
      const userData = { id: "1", name: "John Doe", email: "john@example.com" };
      const user = createUserFromObject(userData);

      expect(user.id).toBe("1");
      expect(user.name).toBe("John Doe");
      expect(user.email).toBe("john@example.com");
    });

    it("should throw error when object has invalid email", () => {
      expect(() => {
        createUserFromObject({ id: "1", name: "John Doe", email: "invalid-email" });
      }).toThrow("Invalid email format");
    });
  });
});
