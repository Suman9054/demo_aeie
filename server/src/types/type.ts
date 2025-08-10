import z from "zod";
import mongoose from "mongoose";

export const userzodscema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
});

export const user_loginschema = z.object({
  username: z.string(),
  hash: z.string(),
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
  user: mongoose.Types.ObjectId,
  event: mongoose.Types.ObjectId,
});

export const user_return_schema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.string(),
  createdAt: z.date(),
});

export type UserReturnSchema = z.infer<typeof user_return_schema>;
export type neweventschema = z.infer<typeof event_schema>;
