export const getTaskStatus = (task) => {
  if (task.active) return 'active'
  if (task.newTask) return 'newTask'
  if (task.completed) return 'completed'
  if (task.failed) return 'failed'
  return 'unknown'
}

export const validateTask = (task) => {
  const requiredFields = ['taskTitle', 'taskDescription', 'taskDate', 'category']
  return requiredFields.every(field => task[field])
}

export const updateTaskStatus = (userData, targetTask, newStatus) => {
  return userData.map(employee => {
    const taskIndex = employee.tasks.findIndex(task => 
      task.taskTitle === targetTask.taskTitle && 
      task.taskDate === targetTask.taskDate
    )

    if (taskIndex === -1) return employee

    const updatedTasks = [...employee.tasks]
    const oldStatus = getTaskStatus(updatedTasks[taskIndex])
    
    // Reset all status flags
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      active: false,
      newTask: false,
      completed: false,
      failed: false
    }

    // Set new status
    updatedTasks[taskIndex][newStatus] = true;
    
    // Update task counts
    const taskCounts = { newTask: 0, active: 0, completed: 0, failed: 0, ...employee.taskCounts };

    if (oldStatus !== 'unknown' && taskCounts[oldStatus] !== undefined) {
      taskCounts[oldStatus] = Math.max(0, taskCounts[oldStatus] - 1)
    }
    taskCounts[newStatus] = (taskCounts[newStatus] || 0) + 1

    return {
      ...employee,
      tasks: updatedTasks,
      taskCounts
    }
  })
}