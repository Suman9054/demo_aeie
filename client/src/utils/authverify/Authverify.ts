import { redirect } from "@tanstack/react-router";
import { api_client } from "../axiosclient/axios";

export const authverify = async () => {
  try {
    await api_client.get("/api/jwt/verify");
    return {};
  } catch (err) {
    console.error("JWT invalid:", err);
    throw redirect({ to: "/auth/login" });
  }
};
