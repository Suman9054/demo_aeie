import { Hono } from "hono";
import type {
  user_login_schema,
  user_registration_schema,
} from "../../../types/type";
import {
  asine_sesion_to_user,
  create_user,
  find_user,
  update_sesion,
} from "../../../db/db";
import {
  
  hash_password,
  make_new_sesion_token,
  verify_hash,
} from "../../../helper/helper";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

const authRouter = new Hono();

authRouter.post("/login", async (c) => {
  const { email, password } =  await c.req.json() as unknown as user_login_schema;

  if (!email || !password) {
    return c.text("Email and password are required", 400);
  }
  const user = await find_user({ email });
  if (!user) {
    return c.text("User not found", 404);
  }
  const isvalid = verify_hash(password, user.password);
  if (!isvalid) {
    return c.text("Invalid password", 401);
  }
  const token = make_new_sesion_token();
  update_sesion(user._id.toString(), token);
  const jwt_token = await sign(
    {
      userId: user._id.toString(),
    },

    process.env.JWT_SECRET as string,
  );
  setCookie(c, "jwt_token", jwt_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  setCookie(c, "session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return c.json({ message: "Login successful" ,user:user}, 200);
});

authRouter.post("/register", async (c) => {
  const { username, password, email } = await
    c.req.json() as unknown as user_registration_schema;
  if (!username || !password || !email) {
    return c.text("Username, password, and email are required", 400);
  }
  const existingUser = await find_user({ email });
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
  const jwt_token = await sign({
    userId: user._id.toString()
  }, process.env.JWT_SECRET as string);
  setCookie(c, "jwt_token", jwt_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,// 1 week
  });
  //const otp = await genarateotp(user._id.toString());
  //console.log("Generated OTP:", otp);
  const token = make_new_sesion_token();
  await asine_sesion_to_user(user._id, token);

  setCookie(c, "session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,// 1 week
  });
  return c.json({ message: "User Registration successful",user:user}, 201);
});



export default authRouter;
