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
});

export const upadate_event_shema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  lastdate: z.coerce.date().optional(),
  poster_: z.any().optional(),
  event_type: z.enum(["event", "competition", "workshop"]).optional(),
  id: z.string().optional(),
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
  varified: z.boolean(),
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
});

export const neweventschema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  date: z.coerce.date(),
  lastdate: z.coerce.date(),
  event_type: z.enum(["event", "competition", "workshop"]),
  poster_: z.any().optional() || null,
});

export type UserReturnSchema = z.infer<typeof user_return_schema>;
export type neweventschema = z.infer<typeof event_schema>;
export type user_login_schema = z.infer<typeof user_login_schema>;
export type user_registration_schema = z.infer<typeof user_registration_schema>;
export type new_registration_schema_zod = z.infer<
  typeof new_registration_schema
>;
export type event_return_schema = z.infer<typeof event_return_schema>;

