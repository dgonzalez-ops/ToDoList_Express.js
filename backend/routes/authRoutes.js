import { AuthController } from '../controllers/authController.js'
import express from 'express'
import { authToken } from '../middleware/authToken.js'

const authController = new AuthController()

export class AuthRoutes {
  constructor () {
    this.router = express.Router()

    // Aquí defines tus rutas y métodos:
    this.router.post('/login', authController.login)
    this.router.post('/register', authController.register)
    this.router.post('/logout', authController.logout)
    this.router.get('/check-auth', authToken, authController.checkauth) // Para manejar logout con GET también
  }

  // Método para exponer el router al exterior
  routes () {
    return this.router
  }
}
