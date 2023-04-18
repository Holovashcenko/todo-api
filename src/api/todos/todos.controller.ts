import { FastifyRequest, FastifyReply } from 'fastify'
import { Todo } from './todos.entity.js'
import { todoRepository } from './todos.repository.js'

interface FastifyRequestWithUser<T extends Record<string, any>> extends FastifyRequest<T> {
  user: {
    id: number
  }
}


const todoController = {
  getAll: async (req: FastifyRequest, res: FastifyReply) => {
    const todos = await todoRepository.getAll()
    return res.send(todos)
  },

  create: async (req: FastifyRequest<{ Body: Todo }>, res: FastifyReply) => {
    const { body } = req
    const todo = await todoRepository.create(body)
    return res.send(todo)
  },

  getById: async (
    req: FastifyRequest<{ Params: { id: number } }>,
    res: FastifyReply
  ) => {
    const { id } = req.params
    const todo = await todoRepository.getById(id)
    return res.send(todo)
  },

  update: async (
    req: FastifyRequest<{ Params: { id: number }; Body: Todo }>,
    res: FastifyReply
  ) => {
    const { id } = req.params
    const { body } = req
    await todoRepository.update(id, body, body.user_id)
    return res.send()
  },

  delete: async (
    req: FastifyRequestWithUser<{ Params: { id: number } }>,
    res: FastifyReply
  ) => {
    const { id } = req.params
    const todo = await todoRepository.getById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }
    if (todo.user_id !== req.user.id) {
      throw new Error(`You are not the owner of todo with id ${id}`)
    }
    await todoRepository.delete(id, todo.user_id)
    return res.send()
  },
}

export { todoController }
