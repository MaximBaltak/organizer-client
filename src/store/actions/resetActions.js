import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api";
import {loaderIn} from "./usersActions";
export const requestNewLogin=createAsyncThunk(
    'reset/requestNewLogin',
    async (_,{getState, dispatch,rejectWithValue})=>{
        dispatch(loaderIn())
        try {
            const body={
                username:getState().reset.login
            }
            const {data}=await api.setNewLogin(body)
            return data
        }catch (e){
            return rejectWithValue(e.response?.data.message)
        }finally {
            dispatch(loaderIn())
        }
    }
)
export const requestNewPassword=createAsyncThunk(
    'reset/requestNewPassword',
    async (_,{getState,dispatch,rejectWithValue})=>{
        dispatch(loaderIn())
        try {
            const body={
                password:getState().reset.password
            }
            const {data}=await api.setNewPassword(body)
            return data
        }catch (e){
            return rejectWithValue(e.response?.data.message)
        }finally {
            dispatch(loaderIn())
        }
    }
)
export const requestSendMail=createAsyncThunk(
    'reset/requestSendMail',
    async (_,{getState,dispatch,rejectWithValue})=>{
        dispatch(loaderIn())
        try {
            const body={
                email:getState().reset.modal.inputEmail,
               type:getState().reset.modal.type
            }
            const {data}=await api.sendMail(body)
            return data
        }catch (e){
            return rejectWithValue(e.response?.data.message)
        }finally {
            dispatch(loaderIn())
        }
    }
)
export const requestConfirmUser=createAsyncThunk(
    'reset/requestConfirmUser',
    async (url,{dispatch,rejectWithValue})=>{
        dispatch(loaderIn())
        try {

            const {data}=await api.checkUser(url)
            return data
        }catch (e){
            return rejectWithValue(e.response?.data)
        }finally {
            dispatch(loaderIn())
        }
    }
)
const resetSlice = createSlice({
    name: 'reset',
    initialState: {
        modal: {
            statusSend:'',
            resetWindow: false,
            inputEmail: '',
            error: {
                errorColor: '',
                errorText: '',
                error: false
            },
            type:'login'
        },
        status:'',
        typePage:'',
        confirmUser:false,
        login:'',
        password:'',
        errorsData:{
            login:{
                error:false,
                text:'',
                borderColor:''
            },
            password:{
                error:false,
                text:'',
                borderColor:''
            }
        }
    },
    reducers:{
        inputEmailChange(state,{payload}) {
            const regx = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
            if (regx.test(payload.text)) {
                state.modal.error.error = false
                state.modal.error.errorColor = 'green'
                state.modal.error.errorText = ''
            } else {
                state.modal.error.error = true
                state.modal.error.errorColor = 'red'
                state.modal.error.errorText = 'Не корректный Email '
            }
            state.modal.inputEmail = payload.text
        },

        inputLogin(state,{payload}){
            if (!payload.text) {
                state.errorsData.login.error=true
                state.errorsData.login.borderColor = 'red'
                state.errorsData.login.text = 'Логин не должен быть пустым'
            } else {
                if(!/[0a-z9]+/ig.test(payload.text)){
                    state.errorsData.login.error=true
                    state.errorsData.login.borderColor = 'red'
                    state.errorsData.login.text = 'Должны быть латинские символы'
                }else {
                    state.errorsData.login.error=false
                    state.errorsData.login.borderColor = 'green'
                    state.errorsData.login.text = ''
                }
            }
            state.login = payload.text
        },
        inputPassword(state, {payload}) {
            if (payload.text.length < 8) {
                state.errorsData.password.borderColor = 'red'
                state.errorsData.password.text = 'Пароль должен быть минимум 8 символов'
                state.errorsData.password.error = true
            } else {
                if(!/[0a-z9]+/ig.test(payload.text)){
                    state.errorsData.login.error=true
                    state.errorsData.password.borderColor = 'red'
                    state.errorsData.password.text = 'Должны быть латинские символы и цифры '
                }else {
                    if(!/[+@&]/g.test(payload.text)) {
                        state.errorsData.login.error=true
                        state.errorsData.password.borderColor = 'red'
                        state.errorsData.password.text = 'пароль должен содержать один из этих знаков: + @ &'
                    }else {
                        state.errorsData.password.borderColor = 'green'
                        state.errorsData.password.text = ''
                        state.errorsData.password.error = false
                    }
                }
            }
            state.password = payload.text
        },
        toggleResetWindow(state,{payload}){
            if(payload.type){
                if(payload.type==='login'){
                    state.modal.type='login'
                    state.modal.resetWindow=!state.modal.resetWindow
                }else {
                    state.modal.type='password'
                    state.modal.resetWindow=!state.modal.resetWindow
                }
            }else {
                state.modal.resetWindow=!state.modal.resetWindow
            }
        }
    },
    extraReducers:{
        [requestSendMail.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.modal.inputEmail=''
            state.modal.error.errorText=''
            state.modal.error.errorColor=''
            state.modal.error.error=false
            state.modal.statusSend=payload.message
        },
        [requestSendMail.rejected]:(state,{payload})=>{
            console.log(payload)
            state.modal.inputEmail=''
            state.modal.error.errorText=''
            state.modal.error.errorColor=''
            state.modal.error.error=false
            state.modal.statusSend=payload
        },
        [requestConfirmUser.fulfilled]:(state,{payload})=>{
            console.log(payload)
           state.confirmUser=payload.confirm
            state.typePage=payload.type
        },
        [requestConfirmUser.rejected]:(state,{payload})=>{
            console.log(payload)
            state.confirmUser=payload.confirm

        },
        [requestConfirmUser.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.confirmUser=payload.confirm
            state.typePage=payload.type
        },
        [requestConfirmUser.rejected]:(state,{payload})=>{
            console.log(payload)
            state.confirmUser=payload.confirm

        },
        [requestNewLogin.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.status='Пароль или логин изменён, теперь вы можете войти с новым паролем или логином, а эту вкладку вы можете закрыть'
            state.login=''
            state.errorsData.login.error=false
            state.errorsData.login.text=''
            state.errorsData.login.borderColor=''


        },
        [requestNewLogin.rejected]:(state,{payload})=>{
            console.log(payload)
            state.status=payload
            state.login=''
            state.errorsData.login.error=false
            state.errorsData.login.text=''
            state.errorsData.login.borderColor=''

        },
        [requestNewPassword.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.status='Пароль изменён, теперь вы можете войти с новым паролем, а эту вкладку вы можете закрыть'
            state.password=''
            state.errorsData.password.error=false
            state.errorsData.password.text=''
            state.errorsData.password.borderColor=''

        },
        [requestNewPassword.rejected]:(state,{payload})=>{
            console.log(payload)
            state.status=payload.message
            state.password=''
            state.errorsData.password.error=false
            state.errorsData.password.text=''
            state.errorsData.password.borderColor=''

        }
    }
})
export const {
    inputLogin,
    inputPassword,
    inputEmailChange,
    toggleResetWindow
}=resetSlice.actions

export default resetSlice.reducer