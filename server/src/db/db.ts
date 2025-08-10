import mongoose, { now } from "mongoose";
import z, { date } from "zod";
import {
  eventmodel,
  registrationmodel,
  sessionmodel,
  usermodel,
} from "../schema/schema";

//zode schema
const userzodscema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
});

const user_loginschema = z.object({
  username: z.string(),
  hash: z.string(),
});
const event_schema = z.object({
  itle: z.string(),
  description: z.string(),
  date: z.date(),
  lastdate: z.date(),
  poster_url: z.string(),
  event_type: z.enum(["event", "competition", "workshop"]),
});

const upadate_event_shema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.date().optional(),
  lastdate: z.date().optional(),
  poster_url: z.string().optional(),
  event_type: z.enum(["event", "competition", "workshop"]).optional(),
  id: z.string(),
});

const new_registration_schema = z.object({
  user: mongoose.Types.ObjectId,
  event: mongoose.Types.ObjectId,
});
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
export const create_user = async (userdata: z.infer<typeof userzodscema>) => {
  try {
    await usermodel
      .create({
        name: userdata.username,
        email: userdata.email,
        password: userdata.password,
      })
      .then((user) => {
        return user;
      });
  } catch (e) {
    console.log(e);
  }
};

export const find_user_by_sesion = async (token: string) => {
  // it retur user id asine to the sesion
  try {
    const se = await sessionmodel.findOne({
      token: token,
    });
    if (!se) return;
    return se.user;
  } catch (e) {
    console.log(e);
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
    await sessionmodel.findOne({ _id: userid }).updateOne({
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
    const user = await sessionmodel.findOne({ _id: sesiontoken });
    return user ? user : null;
  } catch (e) {
    console.log(e);
  }
};

export const find_user = async (
  //auth function it return user
  auth_data: z.infer<typeof user_loginschema>,
) => {
  try {
    const user = await usermodel.findOne({
      username: auth_data.username,
      password: auth_data.hash,
    });
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
    await eventmodel
      .create({
        itle: event_data.itle,
        description: event_data.description,
        date: event_data.date,
        lastdate: event_data.lastdate,
        poster_url: event_data.poster_url,
        event_type: event_data.event_type,
      })
      .then((event) => {
        return event;
      });
  } catch (e) {
    console.log(e);
  }
};

export const find_all_events = async () => {
  try {
    await eventmodel.find().then((event) => {
      return event;
    });
  } catch (e) {
    console.log(e);
  }
};

export const find_newest_event = async () => {
  try {
    await eventmodel
      .find()
      .sort({ _id: -1 })
      .then((event) => {
        return event;
      });
  } catch (e) {
    console.log(e);
  }
};

export const find_nearst_events = async () => {
  try {
    await eventmodel
      .find({ date: { $gte: now } })
      .sort({ date: 1 })
      .then((event) => {
        return event;
      });
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
    await eventmodel.findOne({ _id: update_event_data.id }).updateOne({
      title: update_event_data.title,
      description: update_event_data.description,
      date: update_event_data.description,
      lastdate: update_event_data.lastdate,
      poster_url: update_event_data.poster_url,
      event_type: update_event_data.event_type,
    });
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
