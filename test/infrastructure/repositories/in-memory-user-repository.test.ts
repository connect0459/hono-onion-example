import { describe, it, expect, beforeEach } from "vitest";
import { createInMemoryUserRepository } from "../../../src/infrastructure/persistence/in-memory-user-repository";
import { createUser } from "../../../src/domain/entities/user";
import { UserRepository } from "../../../src/domain/repositories/user-repository";

describe("InMemoryUserRepository", () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = createInMemoryUserRepository();
  });

  it("should save and retrieve a user", async () => {
    const user = createUser("1", "John Doe", "john@example.com");

    const savedUser = await repository.save(user);
    expect(savedUser).toEqual(user);

    const foundUser = await repository.findById("1");
    expect(foundUser).toEqual(user);
  });

  it("should return null when user not found", async () => {
    const foundUser = await repository.findById("non-existent");
    expect(foundUser).toBeNull();
  });

  it("should return all users", async () => {
    const user1 = createUser("1", "John Doe", "john@example.com");
    const user2 = createUser("2", "Jane Doe", "jane@example.com");

    await repository.save(user1);
    await repository.save(user2);

    const users = await repository.findAll();
    expect(users).toHaveLength(2);
    expect(users).toContain(user1);
    expect(users).toContain(user2);
  });

  it("should update a user", async () => {
    const user = createUser("1", "John Doe", "john@example.com");
    await repository.save(user);

    const updatedUser = await repository.update("1", { name: "John Smith" });
    expect(updatedUser?.name).toBe("John Smith");
    expect(updatedUser?.email).toBe("john@example.com");
  });

  it("should delete a user", async () => {
    const user = createUser("1", "John Doe", "john@example.com");
    await repository.save(user);

    const deleted = await repository.delete("1");
    expect(deleted).toBe(true);

    const foundUser = await repository.findById("1");
    expect(foundUser).toBeNull();
  });
});
