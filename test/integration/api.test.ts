import { describe, it, expect, beforeEach } from "vitest";
import { Hono } from "hono";
import { createUserController } from "../../src/presentation/controllers/user-controller";
import { createUserUseCase } from "../../src/application/usecases/user-usecase";
import { createInMemoryUserRepository } from "../../src/infrastructure/persistence/in-memory-user-repository";
import { UserRepository } from "../../src/domain/repositories/user-repository";
import { IUserUseCase } from "../../src/application/interfaces/user-usecase-interface";
import { IUserController } from "../../src/presentation/interfaces/user-controller-interface";
import { handleException } from "../../src/presentation/exception/handler";

describe("User API Integration", () => {
  let app: Hono;

  beforeEach(() => {
    const userRepository: UserRepository = createInMemoryUserRepository();
    const userUseCase: IUserUseCase = createUserUseCase(userRepository);
    const userController: IUserController = createUserController(userUseCase);

    app = new Hono();

    // Add exception handling
    app.onError((err, c) => {
      return handleException(err, c);
    });

    app.post("/users", c => userController.createUser(c));
    app.get("/users/:id", c => userController.getUserById(c));
    app.get("/users", c => userController.getAllUsers(c));
    app.put("/users/:id", c => userController.updateUser(c));
    app.delete("/users/:id", c => userController.deleteUser(c));
  });

  it("should create a user via POST /users", async () => {
    const userData = { id: "1", name: "John Doe", email: "john@example.com" };

    const req = new Request("http://localhost/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    const res = await app.fetch(req);
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body).toEqual(userData);
  });

  it("should get user by id via GET /users/:id", async () => {
    const userData = { id: "1", name: "John Doe", email: "john@example.com" };

    await app.fetch(
      new Request("http://localhost/users", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      })
    );

    const res = await app.fetch(new Request("http://localhost/users/1"));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual(userData);
  });

  it("should return 404 for non-existent user", async () => {
    const res = await app.fetch(new Request("http://localhost/users/999"));
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(res.headers.get("Content-Type")).toBe("application/problem+json");
    expect(body).toEqual({
      type: "https://example.com/probs/not-found",
      title: "Not Found",
      status: 404,
      detail: "User with ID '999' was not found in the system.",
      instance: "http://localhost/users/999",
    });
  });
});
