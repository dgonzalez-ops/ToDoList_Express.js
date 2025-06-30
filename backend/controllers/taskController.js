import { getUserTasksFromDb, createTaskInDb, deleteTaskFromDb, completeTaskFromDb } from '../services/taskService.js'

class TaskController {
  // Método para crear una tarea
  createTask = async (req, res) => {
    try {
      const taskData = req.body
      const newTask = await createTaskInDb(taskData, req.user.userId)
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

  // Método para eliminar una tarea
  deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id
      const userId = req.user.userId
      console.log('ID de tarea a eliminar:', taskId)
      console.log('ID de usuario:', userId)

      const result = await deleteTaskFromDb(taskId, userId)
      res.status(200).json(result)
    } catch {
      res.status(500).json({ error: 'Error al eliminar la tarea' })
    }
  }

  // Método para completar una tarea
  completeTask = async (req, res) => {
    try {
      const taskId = req.params.id
      const userId = req.user.userId
      console.log('ID de tarea a completar:', taskId)
      const result = await completeTaskFromDb(taskId, userId)
      res.status(200).json(result)
    } catch {
      res.status(500).json({ error: 'Error al completar la tarea' })
    }
  }
}

export { TaskController }
