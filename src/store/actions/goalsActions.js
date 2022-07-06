import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api";
import {requestDeleteTasksAll} from "./tasksActions";

export const getGoalsId = createAsyncThunk(
    'goals/getGoalsId',
    async (_, {rejectWithValue}) => {
        try {
            const userId = JSON.parse(localStorage.getItem('id'))
            const {data} = await api.getGoalsId(userId)
            return data
        } catch (e) {
            rejectWithValue(e.response?.data.message)
        }
    }
)
export const requestAddGoal = createAsyncThunk(
    'goals/requestAddGoa',
    async (nowDate, {getState, fulfillWithValue, rejectWithValue}) => {
        try {
            const errorTitle = getState().goals.valueTitle === ''
            const errorTodo = getState().goals.valueTodo === ''
            if (!errorTitle && !errorTodo) {
                console.log(errorTodo, errorTitle)
                let tasks = []
                let newTasks = getState().goals.valueTodo.split(',')
                newTasks.forEach(el => {
                    let task = {
                        title: el,
                        check: false,
                        color: 'white',
                        showButton: true,
                        borderColor: 'white'
                    }
                    tasks.push(task)
                })
                let goal = {
                    userId: JSON.parse(localStorage.getItem('id')),
                    title: getState().goals.valueTitle,
                    dateStart: nowDate,
                    dateEnd: !getState().goals.valueDate ? null : getState().goals.valueDate,
                    day: {
                        text: 'Выполнено',
                        color: 'green',
                    },
                    state: {
                        text: 'в процессе',
                        color: 'yellow',
                    },
                    tasks: [...tasks],
                    percent: 0,
                    colorPercent: 'yellow',
                    borderColor: 'grey',

                }
                if (!goal.DateEnd) {
                    goal.day = null
                }
                const {data} = api.addGoal(goal)
                return data
            }
            return fulfillWithValue({errorTodo, errorTitle})
        } catch (e) {
            rejectWithValue(e.response?.data.message)
        }
    }
)
export const requestUpdateGoalsId = createAsyncThunk(
    'goals/requestUpdateGoalsId',
    async (goalAndTaskId, {getState, rejectWithValue}) => {
        try {
            const body = {
                percent: 0,
                colorPercent: 'yellow',
                state: {
                    text: 'В процессе',
                    color: 'yellow',

                },
                task: {
                    check: true,
                    borderColor: 'green',
                    showButton: false
                }
            }
            getState().goals.goals.forEach(goal => {
                if (goal._id === goalAndTaskId.goalId) {
                    let onePercent = 100 / goal.tasks.length
                    body.percent = +(goal.percent + onePercent).toFixed(2)
                    if (body.percent >= 99.5) {
                        body.percent = 100
                    }
                }
                if (body.percent >= 100) {
                    body.colorPercent = 'green'
                    body.state.text = 'Завершена'
                    body.state.color = 'green'
                }
            })
            const {data} = await api.updateGoalId(goalAndTaskId.goalId, goalAndTaskId.taskId, body)
            return data
        } catch (e) {
            rejectWithValue(e.response?.data.message)
        }
    }
)
export const requestDeleteGoalsIdAll = createAsyncThunk(
    'goals/requestDeleteGoalsIdAll',
    async (goalId, {rejectWithValue}) => {
        try {
            const userId = JSON.parse(localStorage.getItem('id'))
            const {data} = await api.deleteGoalIdAll(userId, goalId)
            return data
        } catch (e) {
            return rejectWithValue(e.response?.data.message)
        }
    }
)

const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        valueTitle: '',
        valueDate: '',
        valueTodo: '',
        errors: {
            errorTitle: false,
            errorTodo: false,
        },
        valueWindow: false,
        checkWindow: false,
        goals: [],
    },
    reducers: {
        changedTitle(state, {payload}) {
            state.valueTitle = payload.text
        },
        changedTodo(state, {payload}) {
            state.valueTodo = payload.text
        },
        changedDate(state, {payload}) {
            state.valueDate = payload.text
        },
        toggleWindow(state) {
            state.valueWindow = !state.valueWindow
            if (!state.valueDate) {
                state.checkWindow = false
            } else {
                state.checkWindow = true
            }
        },
    },
    extraReducers: {
        [getGoalsId.fulfilled]: (state, {payload}) => {
            if (Array.isArray(payload?.goals)) {
                state.goals = [...payload.goals]
                state.goals.reverse()
            }
        },
        [getGoalsId.rejected]: (state, {payload}) => {
            console.log(payload)
        },
        [requestAddGoal.fulfilled]: (state, {payload}) => {
            if (payload?.errorTodo || payload?.errorTitle) {
                state.errors.errorTitle = payload.errorTitle
                state.errors.errorTodo = payload.errorTodo
                state.valueWindow = !state.valueWindow
                state.valueDateEnd = ''
                state.valueTitle = ''
                state.valueTodo = ''
            } else {
                state.valueWindow = !state.valueWindow
                state.valueDate = ''
                state.valueTitle = ''
                state.valueTodo = ''
                for (let key in state.errors) {
                    state.errors[key] = false
                }
            }

        },
        [requestAddGoal.rejected]: (state, {payload}) => {
            state.valueWindow = !state.valueWindow
            state.valueDate = ''
            state.valueTitle = ''
            state.valueTodo = ''
            for (let key in state.errors) {
                state.errors[key] = false
            }
            console.log(payload)
        },
        [requestUpdateGoalsId.fulfilled]: (state, {payload}) => {
            // console.log(payload)
        },
        [requestUpdateGoalsId.rejected]: (state, {payload}) => {
            console.log(payload)
        },
        [requestDeleteTasksAll.fulfilled]: (state, {payload}) => {
            // console.log(payload)
        },
        [requestDeleteTasksAll.rejected]: (state, {payload}) => {
            console.log(payload)
        }
    }
})
export const {
    changedTitle,
    changedTodo,
    changedDate,
    toggleWindow,
} = goalsSlice.actions
export default goalsSlice.reducer