import { Hono } from "hono";
import { db_connect } from "./db/db";

const app = new Hono();

db_connect();
export default {
  port: 3000,
  fetch: app.fetch,
};
