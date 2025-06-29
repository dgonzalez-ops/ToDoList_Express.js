import { getUserTasksFromDb } from '../services/taskService.js'

class TaskController {
  // Método para crear una tarea
  createTask = async (req, res) => {
    try {
      const taskData = req.body
      const newTask = await this.taskService.createTask(taskData)
      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // Método para obtener todas las tareas
  getAllTasks = async (req, res) => {
    try {
      const userId = req.user.userId// ← Lo que puso el middleware authToken
      console.log('ID de usuario obtenido del token:', userId)
      const tasks = await getUserTasksFromDb(userId)
      res.status(200).json(tasks)
    } catch (error) {
      console.error('Error al obtener tareas:', error.message)
      res.status(500).json({ error: 'Error al obtener tareas' })
    }
  }
}

export { TaskController }
