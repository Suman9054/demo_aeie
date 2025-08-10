import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify_admin } from "../helper/helper";

export const admin_verify_middleware = async (c: Context, next: Next) => {
  const { token } = getCookie(c);

  if (!token) {
    return c.text("Unauthorized", 401);
  }

  const is_admin = verify_admin(token);
  if (!is_admin) {
    return c.text("Unauthorized", 401);
  }

  await next();
};
