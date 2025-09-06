import axios from "axios";

export const api_client = axios.create({
  baseURL: "http://aeie.localhost",
  withCredentials: true,
});
