import {configureStore} from "@reduxjs/toolkit";
import goalsSlice from './actions/goalsActions'
import tasksSlice from './actions/tasksActions'
import usersSlice from './actions/usersActions'
import globalTimeSlice from "./actions/globalTimeActions";
import backgroundAnimationSlice from "./actions/backgroundAnimationActions";
import resetSlice from './actions/resetActions'
import confirmEmail from './actions/confirmEmailActions'
export const store = configureStore({
    reducer: {
        goals: goalsSlice,
        tasks: tasksSlice,
        users: usersSlice,
        globalDateTime: globalTimeSlice,
        background: backgroundAnimationSlice,
        reset:resetSlice,
        confirm:confirmEmail
    },
    devTools: true
})
export default store;
