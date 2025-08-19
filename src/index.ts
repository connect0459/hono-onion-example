import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { setupRoutes } from "./presentation/routes";

const app = new Hono();

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
