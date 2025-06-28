import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async ({ username, email, password }) => {
  const existing = await User.findOne({ where: { email } })
  if (existing) return { error: 'Email ya registrado' }

  const existingUsername = await User.findOne({ where: { username } })
  if (existingUsername) return { error: 'Nombre de usuario ya registrado' }

  const id = crypto.randomUUID()
  if (!id) return { error: 'Error al generar ID de usuario' }

  const hashed = await bcrypt.hash(password, 10)
  const createdAt = new Date()
  if (!hashed) return { error: 'Error al hashear la contraseña' }
  const user = await User.create({ id, username, email, password: hashed, createdAt, updatedAt: createdAt })
  if (!user) return { error: 'Error al crear el usuario' }
  return { message: 'Usuario creado', userId: user.id }
}

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } })
  if (!user) return { error: 'Usuario incorrecto' }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return { error: 'Contraseña incorrecta' }

  const payload = { userId: user.id, email: user.email }
  const token = jwt.sign(payload, process.env.JWT_KEYWORD, { expiresIn: '1h' })
  if (!token) return { error: 'Error al generar el token' }

  const response = { message: 'Inicio de sesión exitoso', userId: user.id }
  return { response, token }
}
