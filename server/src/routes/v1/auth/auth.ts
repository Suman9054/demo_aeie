import { Hono } from "hono";
import { de } from "zod/locales";
import type {
  user_login_schema,
  user_registration_schema,
} from "../../../types/type";
import {
  asine_sesion_to_user,
  auth_user_by_sesion,
  create_user,
  find_user,
  update_sesion,
} from "../../../db/db";
import {
  hash_password,
  make_new_sesion_token,
  verify_hash,
} from "../../../helper/helper";
import { getCookie, setCookie } from "hono/cookie";
import { use } from "react";

const authRouter = new Hono();

authRouter.get("/login", async (c) => {
  const { username, password } = c.req.query() as unknown as user_login_schema;
  if (!username || !password) {
    return c.text("Username and password are required", 400);
  }
  const user = await find_user({ username });
  if (!user) {
    return c.text("User not found", 404);
  }
  const isvalid = verify_hash(password, user.password);
  if (!isvalid) {
    return c.text("Invalid password", 401);
  }
  const token = make_new_sesion_token();
  update_sesion(user._id.toString(), token);
  setCookie(c, "session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return c.json({ message: "Login successful", user }, 200);
});

authRouter.get("/register", async (c) => {
  const { username, password, email } =
    c.req.query() as unknown as user_registration_schema;
  if (!username || !password || !email) {
    return c.text("Username, password, and email are required", 400);
  }
  const existingUser = await find_user({ username });
  if (existingUser) {
    return c.text("User already exists", 409);
  }
  const hashed_password = await hash_password(password);
  const user = await create_user({
   username: username,
    password: hashed_password,
    email: email,
  });
  if (!user) {
    return c.text("Failed to create user", 500);
  }
  const token = make_new_sesion_token();
  await asine_sesion_to_user(user._id, token);
  
  setCookie(c, "session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return c.json({ message: "User Registration successful", user }, 201);
});
authRouter.get("/verifysesion", async (c) => {
    const session_token = getCookie(c, "session_token");
    if (!session_token) {
      return c.text("Session token not found", 401);
    }
    const user = await auth_user_by_sesion( session_token );
    if (!user) {
      return c.text("Invalid session token", 401);
    }
    return c.json({ message: "Session is valid", user }, 200);
});



export default authRouter;
