import { Hono } from "hono";
import {
  delete_one_evnt,
  find_all_events,
  find_newest_event,
} from "../../../db/db";
import { admin_verify_middleware } from "../../../middleware/middleware";
import type { neweventschema } from "../../../types/type";

const event_route = new Hono();

event_route.get("/allevents", async (c) => {
  const events = await find_all_events();
  if (!events) {
    return c.status(404);
  }
  return c.json(events);
});

event_route.get("/newestevents", async (c) => {
  const newestevents = await find_newest_event();
  if (!newestevents) {
    return c.status(404);
  }
  return c.json(newestevents);
});

event_route.get("/nearestevents", async (c) => {
  const nearestevents = await find_newest_event();
  if (!nearestevents) {
    return c.status(404);
  }
  return c.json(nearestevents);
});

event_route.delete("/deliteevent/:id", admin_verify_middleware, async (c) => {
  const { id } = c.req.param() as { id: string };
  try {
    delete_one_evnt(id);
    return c.status(200);
  } catch (e) {
    console.log(e);
    return c.status(500);
  }
});

event_route.post("/creat/new/event", admin_verify_middleware, async (c) => {
  // i will do it later
  const { title, description, date } =
    c.req.query() as unknown as neweventschema;
});

export default event_route;
