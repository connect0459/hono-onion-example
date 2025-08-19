import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { setupRoutes } from "./presentation/routes";
import { ExceptionHandler } from "./presentation/exception/handler";

const app = new Hono();

// Add exception handling
app.onError((err, c) => {
  return ExceptionHandler.handle(err, c);
});

setupRoutes(app);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
