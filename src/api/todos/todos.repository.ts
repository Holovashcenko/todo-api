import { Todo } from './todos.entity.js'
import knex from 'knex'
import config from '../../../knexfile.js'

const db = knex(config)

interface ITodoRepository {
  getAll: () => Promise<Todo[]>
  create: (data: Omit<Todo, 'id'>) => Promise<Todo>
  getById: (id: number) => Promise<Todo | undefined>
  update: (id: number, data: Partial<Todo>, userId: number) => Promise<void>
  delete: (id: number, userId: number) => Promise<void>
}

export const todoRepository: ITodoRepository = {
  getAll: async () => {
    const todos: Todo[] = await db.select().from('todos')
    return todos
  },

  create: async (data) => {
    const [todo]: Todo[] = await db('todos').insert(data).returning('*')
    return todo
  },

  getById: async (id) => {
    const [todo]: Todo[] = await db.select().from('todos').where('id', id)
    return todo
  },

  update: async (id, data, userId) => {
    await db('todos').where('id', id).andWhere('user_id', userId).update(data)
  },

  delete: async (id, userId) => {
    await db('todos').where('id', id).andWhere('user_id', userId).del()
  },
}