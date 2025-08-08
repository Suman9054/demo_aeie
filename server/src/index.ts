import { Hono } from "hono";


const app = new Hono();








export default { 
  port: 3000, 
  fetch: app.fetch, 
} 