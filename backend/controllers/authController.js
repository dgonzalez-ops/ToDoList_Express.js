//  const User = require('../models/User')
import { registerUser, loginUser } from '../services/authServices.js'
import { registerSchema, loginSchema } from '../middleware/authValidation.js'
// import { email } from 'zod/v4'

class AuthController {
  login = async (req, res) => {
    try {
      const validated = loginSchema.parse(req.body)

      const result = await loginUser(validated.email, validated.password)
      if (result.error) return res.status(400).json({ error: result.error })
      // Guardar JWT en cookie segura
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: false, // en producción true
        sameSite: 'lax', // strict en producttion, lax en desarrollo
        maxAge: 3600000 // 1 hora
      })

      res.status(200).json({ message: result.message })
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors })
      }
      console.error(error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  logout = async (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/' // IMPORTANTE, especificar path si la cookie se creó con path='/'
    })
    res.status(200).json({ message: 'Sesión cerrada' })
  }

  register = async (req, res) => {
    try {
    // Validar datos recibidos
      const validatedData = registerSchema.parse(req.body)

      // validatedData = { username, email, password }
      const result = await registerUser(validatedData)

      if (result.error) return res.status(400).json({ error: result.error })
      res.status(201).json({ message: 'Usuario creado', userId: result.userId })
    } catch (error) {
      if (error.name === 'ZodError') {
        // Si la validación falla, envía errores legibles
        return res.status(400).json({ errors: error.errors })
      }
      console.error(error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  checkauth = (req, res) => {
    // authToken ya verificó todo
    res.status(200).json({ message: 'Usuario autenticado', user: req.user })
  }
}
export { AuthController }
