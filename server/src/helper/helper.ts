import { auth_user_by_sesion } from "../db/db";

export const hash_password = async (password: string) => {
  const hash = await Bun.password.hash(password);
  return hash;
};

export const verify_hash = async (password: string, hash: string) => {
  const is_match = await Bun.password.verify(password, hash);
  return is_match;
};
export const make_new_sesion_token = () => {
  const token = crypto.randomUUID();
  return token;
};

export const verify_admin = async (token: string) => {
  const user = await auth_user_by_sesion(token);
  if (!user) {
    return false;
  }

  return user.role === "admin";
};
