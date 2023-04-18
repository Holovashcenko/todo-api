import { userController } from './users.controller.js'

const userRoutes = async (app, opts) => {
  app.get('', userController.getAll)
  app.post('', userController.create)
  app.get('/:id', userController.getById)
  app.put('/:id', userController.update)
  app.delete('/:id', userController.delete)
}

export default userRoutes