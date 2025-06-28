import { AuthController } from '../controllers/authController.js'
import express from 'express'

const authController = new AuthController()

export class AuthRoutes {
  constructor () {
    this.router = express.Router()

    // Aquí defines tus rutas y métodos:
    this.router.post('/login', authController.login)
    this.router.post('/register', authController.register)
  }

  // Método para exponer el router al exterior
  routes () {
    return this.router
  }
}
