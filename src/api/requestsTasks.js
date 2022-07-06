import {configAxios} from "./index";

export const getTasksId = userId => {
    return configAxios.get(`/tasks?userId=${userId}`)
}
export const addTask = body => {
    return configAxios.post('/tasks', body)
}
export const updateTaskId = (taskId, body) => {
    return configAxios.put(`/tasks/update?taskId=${taskId}`, body)
}
export const deleteTaskIdAll = (userId, taskId = null) => {
    return configAxios.delete(`/tasks/delete?userId=${userId}${taskId ? `&taskId=${taskId}` : ''}`)
}