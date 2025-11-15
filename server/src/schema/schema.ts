import { Schema, model } from "mongoose";
import type { UserReturnSchema } from "../types/type";


const userSchema: Schema = new Schema<UserReturnSchema>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    varified:{
       type: Boolean,
       default:false
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { suppressReservedKeysWarning: true },
);

const eventSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    lastdate: {
      type: Date,
      required: true,
    },
    poster_url: {
      type: String,
    },
    event_type: {
      type: String,
      enum: ["event", "competition", "workshop"],
      required: true,
    },
  },
  { suppressReservedKeysWarning: true },
);

const registrationSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  phonnumber: {
    type: String,
    required: true,
  },
  roolnumber: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["registered", "cancelled"],
    default: "registered",
  },
});

const sesionSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  validate: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 60 * 24 * 7), // 7 day from now
  },
});

const verificationschema:Schema = new Schema({

  user:{
    type:Schema.Types.ObjectId,
    required:true,
  },
  value:{
    type:String,
    required: true
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
  expireAt:{
    type:Date,
    default: () => new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
  }
})

export const usermodel = model<UserReturnSchema>("User", userSchema);
export const eventmodel = model("Event", eventSchema);
export const registrationmodel = model("Registration_data", registrationSchema);
export const sessionmodel = model("Session", sesionSchema);
export const verificationmodel = model("Email_verification",verificationschema);