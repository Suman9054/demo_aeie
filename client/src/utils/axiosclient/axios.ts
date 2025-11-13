import axios from "axios";

export const api_client = axios.create({
  baseURL: "https://aeie-club-server-rxj0.onrender.com",
  withCredentials: true,
});
