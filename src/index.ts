import { Hono } from "hono";

const app = new Hono();
async function authMiddleware(c: any, next: any) {
  if (c.req.header("Authorization") === "secret") {
    await next();
  }
  return c.json({ error: "Unauthorized" }, 401);
}
app.get("/", authMiddleware, async (c) => {
  const body = await c.req.json();

  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));
  return c.json({ hello: "world" });
});

export default app;
