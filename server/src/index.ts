import { Hono } from "hono";
import { db_connect } from "./db/db";
import event_route from "./routes/v1/event/event";
import authRouter from "./routes/v1/auth/auth";
import { jwt } from 'hono/jwt'
const app = new Hono();

db_connect();
app.use("/api/v1/auth/jwt/verify",jwt({
  secret: process.env.JWT_SECRET as string,
}))
app.route("/api/v1/event", event_route);
app.route("/api/v1/auth", authRouter);

export default {
  port: 3000,
  fetch: app.fetch,
};
