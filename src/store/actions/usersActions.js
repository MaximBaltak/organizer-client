import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api";
export const requestUpdateEmail = createAsyncThunk(
    'users/requestUpdateEmail',
    async (_, {getState,dispatch, rejectWithValue}) => {
        dispatch(loaderIn())
        try {
            const body = {
                email: getState().users.profile.inputConfirmEmail
            }
            const {data} = await api.updateEmail(body)
            return {data,body}
        } catch (error) {
            return rejectWithValue(error.response?.data)
        } finally {
            dispatch(loaderIn())
        }
    }
)

export const requestUpdatePassword = createAsyncThunk(
    'users/requestUpdatePassword',
    async (_, {getState,dispatch, rejectWithValue}) => {
        dispatch(loaderIn())
        try {
            const body = {
                password: getState().users.profile.inputConfirmPassword
            }
            const {data} = await api.updatePassword(body)
            return {data,body}
        } catch (error) {
            return rejectWithValue(error.response?.data)
        } finally {
            dispatch(loaderIn())
        }
    }
)
export const requestUpdateLogin = createAsyncThunk(
    'users/requestUpdateLogin',
    async (_, {getState, dispatch, rejectWithValue}) => {
        dispatch(loaderIn())
        try {
            const body = {
                username: getState().users.profile.inputConfirmLogin
            }
            const {data} = await api.updateLogin(body)
            return {data,body}
        } catch (error) {
            return rejectWithValue(error.response?.data)
        } finally {
            dispatch(loaderIn())
        }
    }
)
export const requestGetData = createAsyncThunk(
    'users/requestGetData',
    async (_, {dispatch ,rejectWithValue}) => {
        dispatch(loaderIn())
        try {
            const {data} = await api.getUser()
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        } finally {
            dispatch(loaderIn())
        }
    }
)
export const requestDeleteProfileId = createAsyncThunk(
    'users/requestDeleteProfileId',
    async (_, {rejectWithValue}) => {
        try {
            const userId = JSON.parse(localStorage.getItem('id'))
            const {data} = await api.deleteProfile(userId)
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)
export const requestRegistration = createAsyncThunk(
    'users/requestRegistration',
    async (_, {getState, dispatch, fulfillWithValue, rejectWithValue}) => {
        dispatch(loaderIn())
        try {
            const body = {
                username: getState().users.inputLogin,
                password: getState().users.inputPassword,
                email: getState().users.inputEmail,
            }
            const {data} = await api.registration(body)

            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem('id', JSON.stringify(data.id))
            localStorage.setItem('confirmEmail', JSON.stringify(data.confirmEmail))
            return fulfillWithValue()
        } catch (e) {
            return rejectWithValue(e.response?.data.message)
        } finally {
            dispatch(loaderIn())
        }
    }
)

export const requestAuthorization = createAsyncThunk(
    'users/requestAuthorization',
    async (_, {getState, dispatch , fulfillWithValue, rejectWithValue}) => {
        dispatch(loaderIn())
        try {
            const body = {
                username: getState().users.inputLogin,
                password: getState().users.inputPassword
            }
            const {data} = await api.authorization(body)

            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem('id', JSON.stringify(data.id))
            localStorage.setItem('confirmEmail', JSON.stringify(data.confirmEmail))
            return fulfillWithValue()
        } catch (e) {
            return rejectWithValue(e.response?.data.message)
        } finally {
            dispatch(loaderIn())
        }
    }
)
const usersSlice = createSlice({
    name: "users",
    initialState: {
        inputLogin: '',
        inputPassword: '',
        inputEmail:'',
        errorsData: {
            globalText: '',
            login: {
                error: false,
                text: '',
                borderColor: null
            },
            password: {
                error: false,
                text: '',
                borderColor: null
            },
            email: {
                error: false,
                text: '',
                borderColor: null
            },
        },
        isLoaderIn: false,
        isSignIn: null, //показывает, какая форма открыта - логин или регистрация
        isOpenAuthLogin: false, //показывает, открыта сейчас форма логина или нет
        isOpenAuthRegister: false, //показывает, открыта сейчас форма регистрации или нет
        userToken: false,
        profile: {
            isOpenDelete: false,
            isChangePassword: false,
            isChangeLogin: false,
            isChangeEmail: false,
            inputLogin: '',
            inputPassword: '',
            inputConfirmLogin: '',
            inputConfirmPassword: '',
            inputEmail: '',
            inputConfirmEmail: '',
            login: '',
            password: '',
            email: '',
            errorLogin: {
                error: false,
                text: '',
                color: '',
            },
            errorPassword: {
                error: false,
                text: '',
                color: '',
            },
            errorEmail: {
                error: false,
                text: '',
                color: '',
            },
            errorConfirmEmail: {
                error: false,
                text: '',
                color: '',
            },
            errorConfirmLogin: {
                error: true,
                text: '',
                color: '',
            },
            errorConfirmPassword: {
                error: true,
                text: '',
                color: '',
            },
            globalError:''
        },
    },

    reducers: {
        loaderIn(state) {
            state.isLoaderIn = !state.isLoaderIn
        },
        changedLogin(state, {payload}) {
            if (!payload.text) {
                state.errorsData.login.borderColor = 'red'
                state.errorsData.login.text = 'Логин не должен быть пустым'
            } else {
                if(!/[0a-z9]+/ig.test(payload.text)){
                    state.errorsData.login.borderColor = 'red'
                    state.errorsData.login.text = 'Должны быть латинские символы'
                }else {
                    state.errorsData.login.borderColor = 'green'
                    state.errorsData.login.text = ''
                }
            }
            state.inputLogin = payload.text
        },
        changedPassword(state, {payload}) {
            if (payload.text.length < 8) {
                state.errorsData.password.borderColor = 'red'
                state.errorsData.password.text = 'Пароль должен быть минимум 8 символов'
                state.errorsData.password.error = true
            } else {
                if(!/[0a-z9]+/ig.test(payload.text)){
                    console.log(9)
                    state.errorsData.password.borderColor = 'red'
                    state.errorsData.password.text = 'Должны быть латинские символы и цифры '
                }else {
                    if(!/[+@&]/g.test(payload.text)) {
                        state.errorsData.password.borderColor = 'red'
                        state.errorsData.password.text = 'пароль должен содержать один из этих знаков: + @ &'
                    }else {
                        state.errorsData.password.borderColor = 'green'
                        state.errorsData.password.text = ''
                        state.errorsData.password.error = true
                    }
                }
            }
            state.inputPassword = payload.text
        },
        inputChangeEmail(state,{payload}) {
            const regx = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
            console.log(3)
            if (regx.test(payload.text)) {
                state.errorsData.email.error = false
                state.errorsData.email.borderColor = 'green'
                state.errorsData.email.text = ''
            } else {
                state.errorsData.email.error = true
                state.errorsData.email.borderColor = 'red'
                state.errorsData.email.text = 'Не корректный Email '
            }
            state.inputEmail = payload.text
        },
        setSignIn(state) {
            state.isSignIn = true;
        },
        setSignUp(state) {
            state.isSignIn = false;
        },
        removeSignIn(state) {
            state.isSignIn = null
            state.isOpenAuthRegister = false
            state.isOpenAuthLogin = false
            state.inputLogin = ''
            state.inputPassword = ''
            state.errorsData.globalText = ''
        },
        removeUserToken(state) {
            state.userToken = false;
            localStorage.clear()
        },
        addUserToken(state) {
            state.userToken = true;
        },
        toggleWindowDelete(state) {
            state.profile.isOpenDelete = !state.profile.isOpenDelete
        },
        toggleWindowChangeLogin(state) {
            state.profile.isChangeLogin = !state.profile.isChangeLogin
        },
        toggleWindowChangePassword(state) {
            state.profile.isChangePassword = !state.profile.isChangePassword
        },
        toggleWindowChangeEmail(state) {
            state.profile.isChangeEmail = !state.profile.isChangeEmail
        },
        inputLoginProfile(state, {payload}) {
            if (!payload.text) {
                state.profile.errorLogin.color = 'red'
                state.profile.errorLogin.text = 'Логин не должен быть пустым'
                state.profile.errorLogin.error = true
            } else {
                if(!/[0a-z9]+/g.test(payload.text)){
                    state.profile.errorLogin.color = 'red'
                    state.profile.errorLogin.text = 'Должны быть латинские строчные символы'
                    state.profile.errorLogin.error = true
                }else {
                    state.profile.errorLogin.color = 'green'
                    state.profile.errorLogin.text = ''
                    state.profile.errorLogin.error = false
                }
            }
            state.profile.inputLogin = payload.text
        },
        inputPasswordProfile(state, {payload}) {
            if (payload.text.length < 8) {
                state.profile.errorPassword.color = 'red'
                state.profile.errorPassword.text = 'Пароль должен быть минимум 8 символа'
                state.profile.errorPassword.error = true
            } else {
                if(!/[0a-z9]+/g.test(payload.text)){
                    state.profile.errorPassword.color = 'red'
                    state.profile.errorPassword.text = 'Пароль должен быть строчные символы и цифры'
                    state.profile.errorPassword.error = true
                }else {
                    if(!/[+@&]/g.test(payload.text)) {
                        state.profile.errorPassword.color = 'red'
                        state.profile.errorPassword.text = 'пароль должен содержать один из этих знаков: + @ &'
                        state.profile.errorPassword.error = true
                    }else {
                        state.profile.errorPassword.color = 'green'
                        state.profile.errorPassword.text = ''
                        state.profile.errorPassword.error = false
                    }
                }
            }

            state.profile.inputPassword = payload.text
        },
        inputEmailProfile(state,{payload}) {
            const regx = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
            if (regx.test(payload.text)) {
                state.profile.errorEmail.error = false
                state.profile.errorEmail.color = 'green'
                state.profile.errorEmail.text = ''
            } else {
                state.profile.errorEmail.error = true
                state.profile.errorEmail.color = 'red'
                state.profile.errorEmail.text = 'Не корректный Email '
            }
            state.profile.inputEmail = payload.text
        },
        inputConfirmLoginProfile(state, {payload}) {
            if (payload.text !== state.profile.inputLogin) {
                state.profile.errorConfirmLogin.color = 'red'
                state.profile.errorConfirmLogin.text = 'Логины не совпадают'
                state.profile.errorConfirmLogin.error = true
            } else {
                state.profile.errorConfirmLogin.color = 'green'
                state.profile.errorConfirmLogin.text = ''
                state.profile.errorConfirmLogin.error = false
            }
            state.profile.inputConfirmLogin = payload.text
        },
        inputConfirmPasswordProfile(state, {payload}) {
            if (payload.text !== state.profile.inputPassword) {
                state.profile.errorConfirmPassword.color = 'red'
                state.profile.errorConfirmPassword.text = 'Пароли не совпадают'
                state.profile.errorConfirmPassword.error = true
            } else {
                state.profile.errorConfirmPassword.color = 'green'
                state.profile.errorConfirmPassword.text = ''
                state.profile.errorConfirmPassword.error = false
            }
            state.profile.inputConfirmPassword = payload.text
        },
        inputConfirmEmailProfile(state, {payload}) {
            if (payload.text !== state.profile.inputEmail) {
                state.profile.errorConfirmEmail.color = 'red'
                state.profile.errorConfirmEmail.text = 'Логины не совпадают'
                state.profile.errorConfirmEmail.error = true
            } else {
                state.profile.errorConfirmEmail.color = 'green'
                state.profile.errorConfirmEmail.text = ''
                state.profile.errorConfirmEmail.error = false
            }
            state.profile.inputConfirmEmail = payload.text
        },
    },
    extraReducers: {
        [requestAuthorization.fulfilled]: state => {
            state.isSignIn = null
            state.isOpenAuthLogin = false
            state.inputLogin = ''
            state.inputPassword = ''
            state.inputEmail = ''
            state.errorsData.globalText = ''
        },
        [requestAuthorization.rejected]: (state, action) => {
            state.errorsData.globalText = action.payload
        },
        [requestRegistration.fulfilled]: state => {
            state.isSignIn = null
            state.isOpenAuthRegister = false
            state.inputLogin = ''
            state.inputPassword = ''
            state.errorsData.globalText = ''
        },
        [requestRegistration.rejected]: (state, action) => {
            state.errorsData.globalText = action.payload
        },
        [requestDeleteProfileId.fulfilled]: (state) => {
            localStorage.clear()
            state.profile.isOpenDelete = !state.profile.isOpenDelete
        },
        [requestDeleteProfileId.rejected]: (state, {payload}) => {
            console.log(payload)
            state.profile.isOpenDelete = !state.profile.isOpenDelete
        },
        [requestGetData.fulfilled]: (state, {payload}) => {
            state.profile.login = payload.username
            state.profile.password = payload.password
            state.profile.email = payload.email
            localStorage.setItem('confirmEmail', JSON.stringify(payload.confirmEmail))

        },
        [requestGetData.rejected]: (state, {payload}) => {
            console.log(payload)
        },
        [requestUpdateLogin.fulfilled]: (state, {payload}) => {
            state.profile.inputLogin = ''
            state.profile.inputConfirmLogin = ''
            state.profile.isChangeLogin = !state.profile.isChangeLogin
            localStorage.setItem('token', JSON.stringify(payload.data.newToken))
            localStorage.setItem('id', JSON.stringify(payload.data.id))
            state.profile.login = payload.body.username
            state.profile.globalError=''
        },
        [requestUpdateLogin.rejected]: (state, {payload}) => {
            state.profile.inputLogin = ''
            state.profile.inputConfirmLogin = ''
            state.profile.globalError=payload.message
        },
        [requestUpdatePassword.fulfilled]: (state, {payload}) => {
            state.profile.inputPassword = ''
            state.profile.inputConfirmPassword = ''
            state.profile.globalError=''
            state.profile.isChangePassword = !state.profile.isChangePassword
            localStorage.setItem('token', JSON.stringify(payload.data.newToken))
            localStorage.setItem('id', JSON.stringify(payload.data.id))
            state.profile.password = payload.body.password
        },
        [requestUpdatePassword.rejected]: (state, {payload}) => {
            console.log(payload)
            state.profile.inputPassword = ''
            state.profile.inputConfirmPassword = ''
            state.profile.globalError=payload.message
        },
        [requestUpdateEmail.fulfilled]: (state, {payload}) => {
            state.profile.inputEmail = ''
            state.profile.inputConfirmEmail = ''
            state.profile.globalError=''
            state.profile.isChangeEmail = !state.profile.isChangeEmail
            localStorage.setItem('confirmEmail', JSON.stringify(payload.data.confirmEmail))
            state.profile.email = payload.body.email
        },
        [requestUpdateEmail.rejected]: (state, {payload}) => {
            console.log(payload)
            state.profile.inputEmail = ''
            state.profile.inputConfirmEmail = ''
            state.profile.globalError=payload.message
        },

    }

});

export const {
    toggleWindowChangeEmail,
    inputConfirmEmailProfile,
    inputEmailProfile,
    inputChangeEmail,
    inputConfirmLoginProfile,
    inputConfirmPasswordProfile,
    toggleWindowChangeLogin,
    toggleWindowChangePassword,
    toggleWindowDelete,
    inputLoginProfile,
    inputPasswordProfile,
    deleteUser,
    setSignIn,
    setSignUp,
    removeSignIn,
    signUp,
    removeUserToken,
    changedPassword,
    changedLogin,
    addUserToken,
    loaderIn,
} = usersSlice.actions;

export default usersSlice.reducer;
