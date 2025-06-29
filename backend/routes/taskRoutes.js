import express from 'express'
import { TaskController } from '../controllers/taskController.js'
import { authToken } from '../middleware/authToken.js'

const taskController = new TaskController()

export class TaskRoutes {
  constructor () {
    this.router = express.Router()

    this.router.get('/userTasks', authToken, taskController.getAllTasks)
    this.router.get('/test-auth', authToken, (req, res) => {
      res.json({ message: 'Acceso concedido', user: req.user })
    })
  }

  // Method to expose the router externally
  routes () {
    return this.router
  }
}
