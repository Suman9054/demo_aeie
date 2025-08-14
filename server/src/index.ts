import { Hono } from "hono";
import { db_connect } from "./db/db";
import event_route from "./routes/v1/event/event";
import authRouter from "./routes/v1/auth/auth";
import { jwt } from "hono/jwt";
import registrationRouter from "./routes/v1/registration/registration";
const app = new Hono();

db_connect();
app.use(
  "/api/v1/auth/jwt/verify",
  jwt({
    secret: process.env.JWT_SECRET as string,
  }),
);
app.use(
  "/api/v1/event/*",
  jwt({
    secret: process.env.JWT_SECRET as string,
  }),
);
app.use(
  "/api/v1/registration/*",
  jwt({
    secret: process.env.JWT_SECRET as string,
  }),
);

app.get("/", (c) => {
  return c.text("Welcome to the AEIE");
});
// all the routes
app.route("/api/v1/event", event_route);
app.route("/api/v1/auth", authRouter);
app.route("/api/v1/registration", registrationRouter);

export default {
  port: 3000,
  fetch: app.fetch,
};
