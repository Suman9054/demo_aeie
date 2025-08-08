import { Hono } from "hono";
import { db_conect } from "./db/db";

const app = new Hono();

db_conect(); 
export default {
  port: 3000,
  fetch: app.fetch,
};
