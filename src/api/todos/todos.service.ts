import { todoRepository } from './todos.repository.js'
import { Todo } from './todos.entity.js'

export const todoService: {
  getAll: () => Promise<Todo[]>
  create: (data: Omit<Todo, 'id'>) => Promise<Todo>
  getById: (id: number) => Promise<Todo>
  update: (id: number, data: Partial<Todo>) => Promise<Todo>
  delete: (id: number) => Promise<void>
} = {
  getAll: async () => {
    const todos = await todoRepository.getAll()
    return todos
  },

  create: async (data) => {
    const todo = await todoRepository.create(data)
    return todo
  },

  getById: async (id) => {
    const todo = await todoRepository.getById(id)
    return todo
  },

  update: async (id, data) => {
    await todoRepository.update(id, data)
    const todo = await todoRepository.getById(id)
    return todo
  },

  delete: async (id) => {
    await todoRepository.delete(id)
  },
}
