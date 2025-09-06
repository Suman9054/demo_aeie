import { Hono } from "hono";
import {
  Creat_new_event,
  delete_one_evnt,
  find_all_events,
  find_nearst_events,
  find_newest_event,
} from "../../../db/db";
import { admin_verify_middleware } from "../../../middleware/middleware";
import type {
  neweventschema,
  upadate_event_shema_zod,
} from "../../../types/type";
import { image_upload } from "../../../helper/helper";
import { getCookie } from "hono/cookie";

const event_route = new Hono();

event_route.get("/allevents", async (c) => {
  const events = await find_all_events();
  if (!events) {
    return c.json({ message: "No events found" }, 404);
  }
  return c.json(events);
});

event_route.get("/newestevents", async (c) => {
  const newestevents = await find_newest_event();
  if (!newestevents) {
    return c.json({ message: "No newest events found" }, 404);
  }
  return c.json(newestevents);
});

event_route.get("/nearestevents", async (c) => {
  const nearestevents = await find_nearst_events();
  if (!nearestevents) {
    return c.json({ message: "No nearest events found" }, 404);
  }
  return c.json(nearestevents);
});

event_route.delete("/deleteevent/:id", admin_verify_middleware, async (c) => {
  const { id } = c.req.param() as { id: string };
  try {
    delete_one_evnt(id);
    return c.json({ message: "Event deleted successfully" }, 200);
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
        return c.json({ message: "Failed to create event" }, 500);
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
        return c.json({ message: "Failed to create event" }, 500);
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

event_route.post("/update/event", admin_verify_middleware, async (c) => {
  const { title, description, date, lastdate, poster_url, event_type, id } =
    c.req.query() as unknown as upadate_event_shema_zod;
  if (!id) {
    return c.json({ message: "Event ID is required" }, 400);
  }
  const update_data: any = {};
  if (title) update_data.title = title;
  if (description) update_data.description = description;
  if (date) update_data.date = date;
  if (lastdate) update_data.lastdate = lastdate;
  if (poster_url) update_data.poster_url = poster_url;
  if (event_type) update_data.event_type = event_type;

  try {
    const updated_event = await Creat_new_event(update_data);
    if (!updated_event) {
      return c.json({ message: "Failed to update event" }, 500);
    }
    return c.json("Event updated successfully", 200);
  } catch (e) {
    console.log(e);
    return c.status(500);
  }
});

export default event_route;
