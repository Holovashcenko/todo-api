import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your_secret_key'

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '24h' })
}