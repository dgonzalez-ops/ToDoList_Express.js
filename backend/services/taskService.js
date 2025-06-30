import Task from '../models/Task.js'

export const getUserTasksFromDb = async (userId) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    })
    return tasks
  } catch (error) {
    throw new Error(error.message)
  }
}

export const createTaskInDb = async (taskData, userId) => {
  try {
    console.log('Datos de la tarea recibidos:', taskData)
    taskData.user_id = userId
    const newTask = await Task.create(taskData)
    return newTask
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteTaskFromDb = async (taskId, userId) => {
  try {
    const task = await Task.findOne({ where: { id: taskId, user_id: userId } })
    if (!task) {
      throw new Error('Tarea no encontrada o no pertenece al usuario')
    }
    await task.destroy()
    return { message: 'Tarea eliminada correctamente' }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const completeTaskFromDb = async (taskId, userId) => {
  try {
    const task = await Task.findOne({ where: { id: taskId, user_id: userId } })
    if (!task) {
      throw new Error('Tarea no encontrada o no pertenece al usuario')
    }
    task.completed = true
    await task.save()
    return { message: 'Tarea completada correctamente' }
  } catch (error) {
    throw new Error(error.message)
  }
}
