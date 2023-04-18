import { registerUser, loginUser } from './auth.controller.js'

const authRoutes = async (app, opts) => {
  app.post('/register', registerUser)
  app.post('/login', loginUser)
}

export default authRoutes
