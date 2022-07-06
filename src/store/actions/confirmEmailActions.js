import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api";
export const checkConfirmRequest=createAsyncThunk(
    'confirmEmail/checkConfirmRequest',
    async (token,{rejectWithValue})=> {
        try {
            const {data}=await api.checkConfirmEmail(token)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }

)
export const sendConfirmRequest=createAsyncThunk(
    'confirmEmail/sendConfirmRequest',
    async (_,{rejectWithValue})=> {
        try {
          const {data}=await api.sendConfirmEmail()
            return data
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }

)
const confirmEmailSlice=createSlice({
    name:'confirmEmail',
    initialState:{
        sendStatus:false,
        check:true,
    },
    extraReducers:{
        [sendConfirmRequest.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.sendStatus=true
        },
        [sendConfirmRequest.rejected]:(state,{payload})=>{
            console.log(payload)
            state.sendStatus=false
        },
        [checkConfirmRequest.fulfilled]:(state,{payload})=>{
            console.log(payload)
            localStorage.setItem('confirmEmail',JSON.stringify(payload.confirmEmail))
            state.check=true
        },
        [checkConfirmRequest.rejected]:(state,{payload})=>{
            console.log(payload)
            state.check=false
        },


    }
})
export default confirmEmailSlice.reducer