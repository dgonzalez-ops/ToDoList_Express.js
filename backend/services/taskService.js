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
