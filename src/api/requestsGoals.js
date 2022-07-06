import {configAxios} from "./index";

export const getGoalsId = userId => {
    return configAxios.get(`/goals?userId=${userId}`)
}
export const addGoal = body => {
    return configAxios.post('/goals', body)
}
export const updateGoalId = (goalId, taskId, body) => {
    return configAxios.put(`/goals/update?goalId=${goalId}&taskId=${taskId}`, body)
}
export const deleteGoalIdAll = (userId, goalId ) => {
    return configAxios.delete(`/goals/delete?userId=${userId}${goalId ? `&goalId=${goalId}` : ''}`)
}