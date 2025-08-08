import { Schema,model } from "mongoose";


const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
    password: {
    type: String,
    required: true,
  },
    email: {
    type: String,
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
  }
});

const eventSchema: Schema = new Schema({
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
    required: true,
    },
   event_type: {
    type: String,
    enum: ["event", "competition", "workshop"],
    required: true,
    }
});

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
    registrationDate: {
    type: Date,
    default: Date.now,
    },
    status: {
    type: String,
    enum: ["registered", "cancelled"],
    default: "registered",
    }
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
  }
});
   
export const usermodel = model("User", userSchema);
export const eventmodel = model("Event", eventSchema);
export const registrationmodel = model("Registration", registrationSchema);
export const sessionmodel = model("Session", sesionSchema);


