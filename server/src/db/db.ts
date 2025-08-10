import mongoose, { now } from "mongoose";
import z from "zod";
import {
  eventmodel,
  registrationmodel,
  sessionmodel,
  usermodel,
} from "../schema/schema";
import type {
  event_schema,
  new_registration_schema,
  upadate_event_shema,
  user_loginschema,
  UserReturnSchema,
  userzodscema,
} from "../types/type";

//mongodb connect
export const db_connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("Database connected successfully");
  } catch (error) {
    mongoose.connection.close();
    console.error("Database connection failed:", error);
  }
};
//user creat and auth functions
export const create_user = async (
  userdata: z.infer<typeof userzodscema>,
): Promise<UserReturnSchema> => {
  try {
    const user = await usermodel.create({
      name: userdata.username,
      email: userdata.email,
      password: userdata.password,
    });
    return user;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create user");
  }
};

export const asine_sesion_to_user = async (
  userid: string,
  sesiontoken: string,
) => {
  try {
    await sessionmodel.create({
      user: new mongoose.Types.ObjectId(userid),
      token: sesiontoken,
    });
  } catch (e) {
    console.log(e);
  }
};

export const update_sesion = async (userid: string, sesiontoken: string) => {
  try {
    await sessionmodel.findOne({ user: userid }).updateOne({
      token: sesiontoken,
      updatetedat: Date.now(),
    });
  } catch (e) {
    console.log(e);
  }
};

export const auth_user_by_sesion = async (sesiontoken: string) => {
  //sesion auth check function it return user
  try {
    const sesion = await sessionmodel
      .findOne({ token: sesiontoken })
      .populate<{ user: UserReturnSchema }>("user")
      .exec();
    if (!sesion || !sesion.user) {
      return null;
    }
    const user: UserReturnSchema = {
      username: sesion.user.username,
      email: sesion.user.email,
      password: sesion.user.password,
      role: sesion.user.role,
      createdAt: sesion.user.createdAt,
    };
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const find_user = async (
  //auth function it return user
  auth_data: z.infer<typeof user_loginschema>,
) => {
  try {
    const user = await usermodel.findOne({
      username: auth_data.username,
    });
    return user;
  } catch (e) {
    console.log(e);
  }
};
export const find_user_by_id = async (userid: mongoose.Types.ObjectId) => {
  try {
    const user = await usermodel.findOne({ _id: userid });
    return user;
  } catch (e) {
    console.log(e);
  }
};

//event creat and update functions
export const Creat_new_event = async (
  event_data: z.infer<typeof event_schema>,
) => {
  try {
    const event = await eventmodel.create({
      itle: event_data.title,
      description: event_data.description,
      date: event_data.date,
      lastdate: event_data.lastdate,
      poster_url: event_data.poster_url,
      vedio_url: event_data.vedio_url,
      event_type: event_data.event_type,
    });
    return event;
  } catch (e) {
    console.log(e);
  }
};

export const find_all_events = async () => {
  try {
    const events = await eventmodel.find();
    return events;
  } catch (e) {
    console.log(e);
  }
};

export const find_newest_event = async () => {
  try {
    const event = await eventmodel.find().sort({ _id: -1 });
    return event;
  } catch (e) {
    console.log(e);
  }
};

export const find_nearst_events = async () => {
  try {
    const event = await eventmodel
      .find({ date: { $gte: now } })
      .sort({ date: 1 });
    return event;
  } catch (e) {
    console.log(e);
  }
};

export const delete_one_evnt = async (id: string) => {
  try {
    await eventmodel.findByIdAndDelete({ _id: id });
  } catch (e) {
    console.log(e);
  }
};

export const update_one_event = async (
  update_event_data: z.infer<typeof upadate_event_shema>,
) => {
  try {
    const event = await eventmodel
      .findOne({ _id: update_event_data.id })
      .updateOne({
        title: update_event_data.title,
        description: update_event_data.description,
        date: update_event_data.description,
        lastdate: update_event_data.lastdate,
        poster_url: update_event_data.poster_url,
        event_type: update_event_data.event_type,
      });
    return event;
  } catch (e) {
    console.log(e);
  }
};
// event registration

export const create_new_registration = async (
  registration_data: z.infer<typeof new_registration_schema>,
) => {
  try {
    await registrationmodel.create({
      user: registration_data.user,
      event: registration_data.event,
    });
  } catch (e) {
    console.log(e);
  }
};

export const cancelle_registration = async (registration_id: string) => {
  try {
    await registrationmodel.findOne({ _id: registration_id }).updateOne({
      status: "cancelled",
    });
  } catch (e) {
    console.log(e);
  }
};

export const find_all_registration = async () => {
  try {
    await registrationmodel.find({}).then((registration) => {
      return registration;
    });
  } catch (e) {
    console.log(e);
  }
};

export const delete_one_registration = async (id: mongoose.Types.ObjectId) => {
  try {
    await registrationmodel.findOneAndDelete({ _id: id });
  } catch (e) {
    console.log(e);
  }
};
