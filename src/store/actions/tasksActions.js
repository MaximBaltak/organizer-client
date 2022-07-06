import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api";

export const requestGetTasksId = createAsyncThunk(
    'tasks/requestGetTasksId',
    async (_, {rejectWithValue}) => {
        try {
            const userId = JSON.parse(localStorage.getItem('id'))
            const {data} = await api.getTasksId(userId)

            return data
        } catch (e) {
            return rejectWithValue(e.response?.data.message)
        }
    }
)
export const requestAddTask = createAsyncThunk(
    'tasks/requestAddTask',
    async (_, {getState, fulfillWithValue, rejectWithValue}) => {
        try {
            const errorTitle = getState().tasks.valueTitle === ''
            if (!errorTitle) {
                const body = {
                    userId: JSON.parse(localStorage.getItem('id')),
                    title: getState().tasks.valueTitle,
                    dateStart: !getState().tasks.valueDateStart ? null : getState().tasks.valueDateStart,
                    dateEnd: !getState().tasks.valueDateEnd ? null : getState().tasks.valueDateEnd,
                    day: {
                        text: 'Выполнено',
                        color: 'green',
                    },
                    state: {
                        text: 'в процессе',
                        color: 'yellow',
                    },
                    border: 'grey',
                    check: false,

                }
                if (!body.dateStart || !body.dateEnd) {
                    body.day = null
                }

                const {data} = await api.addTask(body)
                return data
            }
            return fulfillWithValue({errorTitle})
        } catch (e) {
            return rejectWithValue(e.response?.data.message)
        }
    }
)
export const requestDeleteTasksAll = createAsyncThunk(
    'tasks/requestDeleteTasksAll',
    async (taskId, {rejectWithValue}) => {
        try {
            const userId = JSON.parse(localStorage.getItem('id'))
            const {data} = await api.deleteTaskIdAll(userId, taskId)
            console.log(taskId)
            return data
        } catch (e) {
            return rejectWithValue(e.response?.data)
        }
    }
)
export const requestChangedTask = createAsyncThunk(
    'tasks/requestChangedTask',
    async (taskId, {rejectWithValue}) => {
        try {
            const body = {
                border: 'green',
                text: 'Завершена',
                color: 'green',
                check: true,
            }
            const {data} = await api.updateTaskId(taskId, body)
            return data
        } catch (e) {
            return rejectWithValue(e.response?.data)
        }
    }
)


const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        valueWindow: false,
        valueTitle: '',
        valueDateStart: '',
        valueDateEnd: '',
        checkWindow: false,
        errors: {
            errorTitle: false
        },
        todoList: [],
    },
    reducers: {
        changedTitle(state, {payload}) {
            state.valueTitle = payload.value
        },
        changedDateStart(state, {payload}) {
            state.valueDateStart = payload.value
        },
        changedDateEnd(state, {payload}) {
            state.valueDateEnd = payload.value
        },

        toggleWindow(state) {
            state.valueWindow = !state.valueWindow
            if (state.valueDateStart === '' || state.valueDateEnd === '') {
                state.checkWindow = false
            } else {
                state.checkWindow = true
            }
        },
        window(state) {
            state.valueWindow = !state.valueWindow
        },

    },
    extraReducers: {
        [requestGetTasksId.fulfilled]: (state, {payload}) => {
            state.todoList = [...payload.tasks]
            state.todoList.reverse()

        },
        [requestGetTasksId.rejected]: (state, {payload}) => {
            console.log(payload)
        },
        [requestAddTask.fulfilled]: (state, {payload}) => {
            if (payload.errorTitle) {
                state.errors.errorTitle = payload.errorTitle
                state.valueWindow = !state.valueWindow
                state.valueDateEnd = ''
                state.valueDateStart = ''
                state.valueTitle = ''
            } else {
                state.valueWindow = !state.valueWindow
                state.valueDateEnd = ''
                state.valueDateStart = ''
                state.valueTitle = ''
                for (let key in state.errors) {
                    state.errors[key] = false
                }
            }
        },
        [requestAddTask.rejected]: (state, {payload}) => {
            console.log(payload)
            state.valueWindow = !state.valueWindow
            state.valueDateEnd = ''
            state.valueDateStart = ''
            state.valueTitle = ''
            for (let key in state.errors) {
                state.errors[key] = false
            }
        },
        [requestDeleteTasksAll.fulfilled]: (_, {payload}) => {
            //console.log(payload)
        },
        [requestDeleteTasksAll.rejected]: (_, {payload}) => {
            console.log(payload)
        },
        [requestChangedTask.fulfilled]: (_, {payload}) => {
            //console.log(payload)
        },
        [requestChangedTask.rejected]: (_, {payload}) => {
            console.log(payload)
        },
    }

})
export const {
    changedTitle,
    changedDateStart,
    changedDateEnd,
    toggleWindow,
    window,
    clearTasks,
    deleteTask
} = tasksSlice.actions
export default tasksSlice.reducer