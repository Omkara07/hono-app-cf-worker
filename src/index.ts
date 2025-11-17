import { Hono } from 'hono'

const app = new Hono()

// authentication middleware - middleware in cloudfare workers with hono
async function authMiddleware(c: any, next: any) {
  if (c.req.header("Authorization")) {
    await next();
  }
  else {
    return c.text('Unauthorized', 401);
  }
}

// uses this middleware everywhere(all the routes)
app.use(authMiddleware)

// here c in the context for this request. context -> consists both request and response
app.get('/', (c) => c.text('Hello, Hono!'))

// to use the middleware only in this route
app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));


  return c.json({ hello: 'from hono' })

})

export default app
