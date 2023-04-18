import bcrypt from 'bcrypt'
import { userRepository } from '../users/users.repository.js'
import { generateToken } from './helpers/token.helper.js'

export const registerUser = async (req, res) => {
  const { password, ...userData } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await userRepository.create({ ...userData, password: hashedPassword })

  const token = generateToken(newUser.id)

  return { user: newUser, token }
}

export const loginUser = async (req, res) => {
  const { id, password } = req.body

  const user = await userRepository.getById(id)
  if (!user) {
    return res.status(401).send('Invalid credentials')
  }

  const isMatch = await userRepository.comparePassword(id, password)
  if (!isMatch) {
    return res.status(401).send('Invalid credentials')
  }

  const token = generateToken(user.id)

  return { user, token }
}
