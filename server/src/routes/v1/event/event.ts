import { Hono } from "hono";
import {
  Creat_new_event,
  delete_one_evnt,
  find_all_events,
  find_newest_event,
} from "../../../db/db";
import { admin_verify_middleware } from "../../../middleware/middleware";
import type { neweventschema } from "../../../types/type";
import { image_upload } from "../../../helper/helper";

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

event_route.delete("/deleteevent/:id", admin_verify_middleware, async (c) => {
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
  const { title, description, date, lastdate, event_type } =
    c.req.query() as unknown as neweventschema;
  const img = c.req.query("img") as unknown as File;
  const vedio = c.req.query("video") as unknown as File;
  if ((title && description && date && vedio) || img) {
    if (vedio && img) {
      const vedio_url = await image_upload(vedio);
      const img_url = await image_upload(img);
      const new_event = Creat_new_event({
        title: title,
        description: description,
        date: date,
        poster_url: img_url,
        vedio_url: vedio_url,
        event_type: event_type,
        lastdate: lastdate,
      });
      if (!new_event) {
        return c.status(500);
      }
      return c.json("Event created successfully", 200);
    } else if (img) {
      const img_url = await image_upload(img);
      const new_event = Creat_new_event({
        title: title,
        description: description,
        date: date,
        poster_url: img_url,
        event_type: event_type,
        lastdate: lastdate,
      });
      if (!new_event) {
        return c.status(500);
      }
      return c.json("Event created successfully", 200);
    } else {
      const vedio_url = await image_upload(vedio);
      const new_event = Creat_new_event({
        title: title,
        description: description,
        date: date,
        vedio_url: vedio_url,
        event_type: event_type,
        lastdate: lastdate,
      });
      if (!new_event) {
        return c.status(500);
      }
      return c.json("Event created successfully", 200);
    }
  }
});

export default event_route;
