import { Hono } from "hono";
import {
  Creat_new_event,
  delete_one_evnt,
  find_all_events,
  find_nearst_events,
  find_newest_event,
  update_one_event,
} from "../../../db/db";
import { admin_verify_middleware } from "../../../middleware/middleware";
import { image_upload } from "../../../helper/helper";
import { neweventschema, upadate_event_shema } from "../../../types/type";

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

event_route.delete("/deleteevent", admin_verify_middleware, async (c) => {
  const { id } = c.req.query() as { id: string };
  try {
    delete_one_evnt(id);
    return c.json({ message: "Event deleted successfully" }, 200);
  } catch (e) {
    console.log(e);
    return c.status(500);
  }
});

event_route.post("/create/new/event", admin_verify_middleware, async (c) => {
  try {
    
    const form = await c.req.formData();

    
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const date = form.get("date")
      ? new Date(form.get("date") as string).toISOString()
      : undefined;
    const lastdate = form.get("lastdate")
      ? new Date(form.get("lastdate") as string).toISOString()
      : undefined;
    const event_type = form.get("event_type") as string;

    // Extract files
    const poster_ = form.get("poster_");
    const scaner_ = form.get("scaner_");

    
    const parsed = neweventschema.safeParse({
      title,
      description,
      date,
      lastdate,
      event_type,
      poster_,
      scaner_,
    });

    if (!parsed.success) {
      return c.json(
        { message: "Invalid input on phrased", errors: parsed.error.format() },
        400,
      );
    }

    const {
      title: pTitle,
      description: pDescription,
      date: pDate,
      lastdate: pLastdate,
      event_type: pEventType,
      poster_: pPoster,
      scaner_: pVedio,
    } = parsed.data;

   
    let img_url: string | undefined;
    let video_url: string | undefined;

    if (pPoster && pPoster instanceof File) {
      img_url = await image_upload(pPoster);
    }
    if (pVedio && pVedio instanceof File) {
      video_url = await image_upload(pVedio);
    }

   
    const new_event = await Creat_new_event({
      title: pTitle,
      description: pDescription,
      date: pDate,
      lastdate: pLastdate,
      event_type: pEventType,
      poster_url: img_url,
      scaner_url: video_url,
    });

    if (!new_event) {
      return c.json({ message: "Failed to create event" }, 500);
    }

    return c.json(
      { message: "Event created successfully", event: new_event },
      200,
    );
  } catch (err) {
    console.error("Error creating event:", err);
    return c.json({ message: "Server error" }, 500);
  }
});

event_route.put("/update/event", admin_verify_middleware, async (c) => {
  const { id } = c.req.query() as { id: string };
  if (!id) {
    return c.json({ message: "Event ID is required" }, 400);
  }
  
  const update_form = await c.req.formData();
  
  const title = update_form.get("title") as string | undefined;
  const description = update_form.get("description") as string | undefined;
  const date = update_form.get("date")
    ? new Date(update_form.get("date") as string).toISOString()
    : undefined;
  const lastdate = update_form.get("lastdate")
    ? new Date(update_form.get("lastdate") as string).toISOString()
    : undefined;
  const event_type = update_form.get("event_type") as string | undefined;

  const poster_ = update_form.get("poster_");
  const vedio_ = update_form.get("vedio_");

  

  const prased = upadate_event_shema.safeParse({
    title,
    description,
    date,
    lastdate,
    event_type,
    poster_,
    vedio_,
  });

  if (!prased.success) {
    return c.json(
      { message: "Invalid input on phrased", errors: prased.error.format() },
      400,
    );
  }

  const {
      title: pTitle,
      description: pDescription,
      date: pDate,
      lastdate: pLastdate,
      event_type: pEventType,
      poster_: pPoster,
      scaner_: pVedio,
    } = prased.data;
  let poster_url: string | undefined;
  let vedio_url: string | undefined;

  if (vedio_ && vedio_ instanceof File) {
    vedio_url = await image_upload(pVedio);
  }
  if (poster_ && poster_ instanceof File) {
    poster_url = await image_upload(pPoster);
  }

  const update_data: any = {};
  if (title) update_data.title = pTitle;
  if (description) update_data.description = pDescription;
  if (date) update_data.date = pDate;
  if (lastdate) update_data.lastdate = pLastdate;
  if (poster_url) update_data.poster_url = poster_url;
  if (event_type) update_data.event_type = pEventType;
  if (vedio_url) update_data.vedio_url = vedio_url;
  try {
   
    const updated_event = await update_one_event({ id, ...update_data });
    
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
