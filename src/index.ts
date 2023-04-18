import dotenv from 'dotenv'
import fastify from 'fastify'
import todoRoutes from './api/todos/todos.routes.js'
import userRoutes from './api/users/users.routes.js'

dotenv.config()

const app = fastify()

const combinedRoutes = async (app, opts) => {
  app.register(todoRoutes, { prefix: '/todos' })
  app.register(userRoutes, { prefix: '/users' })
}

app.register(combinedRoutes, { prefix: '/api/v1' })

app.listen({ port: 3001 }, (err, address) => {
  if (err) throw err
  console.log(`Server listening on ${address}`)
})
