import mongoose, { now } from "mongoose";
import z from "zod";
import {
  eventmodel,
  registrationmodel,
  sessionmodel,
  usermodel,
} from "../schema/schema";
import type {
  event_return_schema,
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
      username: userdata.username,
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
      _id: sesion.user._id,
      username: sesion.user.username,
      email: sesion.user.email,
      password: sesion.user.password,
      role: sesion.user.role,
      varified: sesion.user.varified,
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
      email: auth_data.email,
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
      title: event_data.title,
      description: event_data.description,
      date: event_data.date,
      lastdate: event_data.lastdate,
      poster_url: event_data.poster_url,
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
    const now = new Date();
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
  data: any,
) => {
  const { id, ...fields } = data;
  try {
    const event = await eventmodel.findOneAndUpdate(
      { _id: id },
      {
        $set: fields,
      },{new: true,}
    );
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
    const register = await registrationmodel.create({
      user: registration_data.user,
      event: registration_data.event_id,
      phonnumber: registration_data.phonnumber,
      roolnumber: registration_data.roolnumber,
      department: registration_data.department,
      year: registration_data.year,
    });
    return register;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const find_one_event = async (event_id: string) => {
  try {
    const event = await eventmodel.findOne({ _id: event_id });
    return event;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const cancel_registration = async (
  user_id: string,
  event_id: string,
) => {
  try {
    const r = await registrationmodel.findOneAndUpdate(
      { user: user_id, event: event_id },
      { $set: { status: "cancelled" } },
      { new: true }, // return updated document
    );
    return r;
  } catch (e) {
    console.error("Error cancelling registration:", e);
    return null;
  }
};

export const find_all_registration = async () => {
  try {
    const registration = await registrationmodel
      .find()
      .populate<UserReturnSchema>("user")
      .populate<event_return_schema>("event");
    return registration;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const delete_one_registration = async (id: string) => {
  try {
    const r = await registrationmodel.findOneAndDelete({ _id: id });
    return r;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const find_registration_by_user = async (user_id: string) => {
  try {
    const registration = await registrationmodel
      .find({ user: user_id })
      .populate<{ event: event_return_schema }>("event")
      .exec();
    return registration;
  } catch (e) {
    console.log(e);
    return null;
  }
};
