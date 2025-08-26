import { Hono } from "hono";
import { registry } from "../../registry";

export const setupRoutes = (app: Hono): void => {
  const userController = registry.userController;

  app.get("/", c => {
    return c.text("Hello Hono!");
  });

  // User routes
  app.post("/users", c => userController.createUser(c));
  app.get("/users/:id", c => userController.getUserById(c));
  app.get("/users", c => userController.getAllUsers(c));
  app.put("/users/:id", c => userController.updateUser(c));
  app.delete("/users/:id", c => userController.deleteUser(c));
};
