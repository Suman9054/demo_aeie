import { Hono } from "hono";
import { db_connect } from "./db/db";
import event_route from "./routes/v1/event/event";
import authRouter from "./routes/v1/auth/auth";
import { jwt } from "hono/jwt";
import { cors } from "hono/cors";
import registrationRouter from "./routes/v1/registration/registration";
import { deleteCookie } from "hono/cookie";
import { verifyotp } from "./helper/helper";


const app = new Hono();

db_connect();

app.use(
  "/*",
  cors({
    origin: "https://aeiehit.onrender.com/",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(
  "/api/jwt/verify",
  jwt({ secret: process.env.JWT_SECRET as string, cookie: "jwt_token" }),
);

app.get("/api/health", (c) => {
  return c.text("Welcome to the AEIE", 200);
});
app.get("/api/jwt/verify", (c) => {
  
  return c.json({ valid: true, message: "Token is valid" });
});

app.delete("/api/logout", (c) => {
  deleteCookie(c, "jwt_token");
  deleteCookie(c, "session_token");
  return c.json({ message: "Logged out successfully" });
});

app.get("/verify/email/:token", async (c) => {
  const { token } = c.req.param();
  const res = await verifyotp(token);
  if (!res) {
    return c.text("Invalid or expired token", 400);
  }
  return c.redirect("https://aeiehit.onrender.com/login");
});
// Routes
app.route("/api/v1/event", event_route);
app.route("/api/v1/auth", authRouter);
app.route("/api/v1/registration", registrationRouter);

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};
