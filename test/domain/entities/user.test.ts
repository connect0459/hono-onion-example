import { describe, it, expect } from "vitest";
import { User } from "../../../src/domain/entities/user";

describe("User", () => {
  it("should create a user with valid data", () => {
    const user = new User("1", "John Doe", "john@example.com");

    expect(user.id()).toBe("1");
    expect(user.name()).toBe("John Doe");
    expect(user.email()).toBe("john@example.com");
  });

  it("should throw error when email is invalid", () => {
    expect(() => {
      new User("1", "John Doe", "invalid-email");
    }).toThrow("Invalid email format");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new User("1", "", "john@example.com");
    }).toThrow("Name is required");
  });
});
