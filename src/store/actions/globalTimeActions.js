import {createSlice} from "@reduxjs/toolkit";

const globalTimeSlice = createSlice({
    name: 'globalTime',
    initialState: {
        datetime: {
            time: '',
            day: '',
            year: '',
        },
    },
    reducers: {
        updateDateTime(state, {payload}) {
            state.datetime.time = payload.time
            state.datetime.day = payload.day
            state.datetime.year = payload.year
        }
    }
})
export const {updateDateTime} = globalTimeSlice.actions
export default globalTimeSlice.reducer