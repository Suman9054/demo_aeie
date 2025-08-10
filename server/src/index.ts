import { Hono } from "hono";
import { db_connect } from "./db/db";
import event_route from "./routes/v1/event/event";

const app = new Hono();

app.route("/api/v1/event", event_route);

db_connect();
export default {
  port: 3000,
  fetch: app.fetch,
};
