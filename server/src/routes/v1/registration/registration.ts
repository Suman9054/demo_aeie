import { Hono } from "hono";
import type { new_registration_schema_zod } from "../../../types/type";
import { getCookie } from "hono/cookie";
import {
  auth_user_by_sesion,
  cancelle_registration,
  create_new_registration,
  delete_one_registration,
  find_all_registration,
  find_one_event,
  find_registration_by_user,
} from "../../../db/db";

import { admin_verify_middleware } from "../../../middleware/middleware";

const registrationRouter = new Hono();

registrationRouter.post("/new/event", async (c) => {
  const { event_id, phonnumber, roolnumber, department, year } =
    c.req.query() as unknown as new_registration_schema_zod;
  const user_sesiontoken = getCookie(c, "session_token");
  if (!user_sesiontoken) {
    return c.text("Unauthorized", 401);
  }
  if (!event_id || !phonnumber || !roolnumber || !department || !year) {
    return c.json({ message: "All fields are required" }, 400);
  }
  const event = find_one_event(event_id);
  if (!event) {
    return c.json({ message: "Event not found" }, 404);
  }
  const user = await auth_user_by_sesion(user_sesiontoken);
  if (!user) {
    return c.text("Unauthorized", 401);
  }

  const registration = await create_new_registration({
    user: user._id,
    event_id: event_id,
    phonnumber: phonnumber,
    roolnumber: roolnumber,
    department: department,
    year: year,
  });
  if (!registration) {
    return c.json({ message: "Failed to register for event" }, 500);
  }
  return c.json({ message: "Registration successful" }, 200);
});

registrationRouter.get("/all/registration", async (c) => {
  const user_sesiontoken = getCookie(c, "session_token");
  if (!user_sesiontoken) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const registrations = await find_all_registration();
  if (!registrations) {
    return c.json({ message: "No registrations found" }, 404);
  }
  return c.json(registrations, 200);
});

registrationRouter.delete(
  "/delet/registration",
  admin_verify_middleware,
  async (c) => {
    const { registration_id } = c.req.query() as { registration_id: string };
    if (!registration_id) {
      return c.json({ message: "Registration ID is required" }, 400);
    }
    const r = await delete_one_registration(registration_id);
    if (!r) {
      return c.json({ message: "Registration not found" }, 404);
    }
    return c.json({ message: "Registration delet successfully" }, 200);
  },
);

registrationRouter.get("/find/registration", async (c) => {
  const user_sesiontoken = getCookie(c, "session_token");
  if (!user_sesiontoken) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const user = await auth_user_by_sesion(user_sesiontoken);
  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const registration = find_registration_by_user(user._id);
  if (!registration) {
    return c.json({ message: "No registrations found for this user" }, 404);
  }
  return c.json(registration, 200);
});

registrationRouter.delete("/cancel/registration", async (c) => {
  const { registration_id } = c.req.query() as { registration_id: string };
  if (!registration_id) {
    return c.json({ message: "Registration ID is required" }, 400);
  }
  const r = await cancelle_registration(registration_id);
  if (!r) {
    return c.json({ message: "Registration not found" }, 404);
  }
  return c.json({ message: "Registration cancelled successfully" }, 200);
});

export default registrationRouter;
