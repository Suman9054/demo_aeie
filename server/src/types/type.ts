import z from "zod";

export const userzodscema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
});

export const user_loginschema = z.object({
  email: z.email(),
});
export const event_schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  lastdate: z.date(),
  poster_url: z.string().optional(),
  event_type: z.enum(["event", "competition", "workshop"]),
  vedio_url: z.string().optional(),
});

export const upadate_event_shema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.date().optional(),
  lastdate: z.date().optional(),
  poster_url: z.string().optional(),
  event_type: z.enum(["event", "competition", "workshop"]).optional(),
  id: z.string(),
});

export const new_registration_schema = z.object({
  user: z.string(),
  event_id: z.string(),
  phonnumber: z.string(),
  roolnumber: z.string(),
  department: z.string(),
  year: z.string(),
});

export const user_return_schema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.string(),
  createdAt: z.date(),
});
const user_registration_schema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
});
const user_login_schema = z.object({
  email: z.email(),
  password: z.string(),
});

const event_return_schema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.date(),
  lastdate: z.date(),
  poster_url: z.string().optional(),
  event_type: z.string(),
  vedio_url: z.string().optional(),
});

export type UserReturnSchema = z.infer<typeof user_return_schema>;
export type neweventschema = z.infer<typeof event_schema>;
export type user_login_schema = z.infer<typeof user_login_schema>;
export type user_registration_schema = z.infer<typeof user_registration_schema>;
export type new_registration_schema_zod = z.infer<
  typeof new_registration_schema
>;
export type event_return_schema = z.infer<typeof event_return_schema>;
export type upadate_event_shema_zod = z.infer<typeof upadate_event_shema>;
