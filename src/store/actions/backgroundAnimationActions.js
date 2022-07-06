import {createSlice} from "@reduxjs/toolkit";

const backgroundAnimationSlice = createSlice({
    name: 'backgroundAnimation',
    initialState: {
        backgroundEffect: {
            preMouseX: 0,
            preElementX: -87,
            directionX: 0,
        }
    },
    reducers: {
        moveAnimation(state,{payload}) {
            if (payload.positionX){
                state.backgroundEffect.directionX = payload.positionX - state.backgroundEffect.preMouseX;
                if (state.backgroundEffect.directionX > 0) {
                    if (state.backgroundEffect.preElementX > -90) {
                        state.backgroundEffect.preElementX--
                    }
                } else if (state.backgroundEffect.directionX < 0) {
                    if (state.backgroundEffect.preElementX < 0) {
                        state.backgroundEffect.preElementX++
                    }
                }
                state.backgroundEffect.preMouseX = payload.positionX
            }
        }
    }
})
export const {moveAnimation} = backgroundAnimationSlice.actions
export default backgroundAnimationSlice.reducer