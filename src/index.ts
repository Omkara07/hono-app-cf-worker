import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello, Hono!'))

app.post('/', async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));


  return c.json({ hello: 'from hono' })

})

export default app
