import { todoRepository } from './todos.repository.js'
import { Todo } from './todos.entity.js'

export const todoService: {
  getAll: () => Promise<Todo[]>
  create: (data: Omit<Todo, 'id'>) => Promise<Todo>
  getById: (id: number) => Promise<Todo>
  update: (id: number, data: Partial<Todo>, ownerId: number) => Promise<Todo>
  delete: (id: number, ownerId: number) => Promise<void>
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

  update: async (id, data, ownerId) => {
    const todo = await todoRepository.getById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }
    if (todo.user_id !== ownerId) {
      throw new Error(`You are not the owner of todo with id ${id}`)
    }
    await todoRepository.update(id, data, ownerId);
    const updatedTodo = await todoRepository.getById(id)
    return updatedTodo
  },

  delete: async (id, ownerId) => {
    const todo = await todoRepository.getById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }
    if (todo.user_id !== ownerId) {
      throw new Error(`You are not the owner of todo with id ${id}`)
    }
    await todoRepository.delete(id, ownerId)
  },
}
