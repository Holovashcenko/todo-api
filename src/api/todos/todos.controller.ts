import { FastifyRequest, FastifyReply } from 'fastify'
import { Todo } from './todos.entity.js'
import { todoRepository } from './todos.repository.js'

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
    await todoRepository.update(id, body)
    return res.send()
  },

  delete: async (
    req: FastifyRequest<{ Params: { id: number } }>,
    res: FastifyReply
  ) => {
    const { id } = req.params
    await todoRepository.delete(id)
    return res.send()
  },
}

export { todoController }
