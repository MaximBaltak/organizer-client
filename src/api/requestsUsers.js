import {configAxios} from "./index";

export const getUser = () => {
    return configAxios.get('/profile')
}
export const updatePassword = body => {
    return configAxios.put('/profile/password', body)
}
export const updateLogin = body => {
    return configAxios.put('/profile/login', body)
}
export const deleteProfile = userId => {
    return configAxios.delete(`/profile?userId=${userId}`)
}
export const updateEmail = body => {
    return configAxios.put('/profile/email', body)
}