import { todoController } from './todos.controller.js'

const todoRoutes = async (app, opts) => {
  app.get('', todoController.getAll)
  app.post('', todoController.create)
  app.get('/:id', todoController.getById)
  app.put('/:id', todoController.update)
  app.delete('/:id', todoController.delete)
}

export default todoRoutes
