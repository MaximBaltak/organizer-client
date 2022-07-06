import {configAxios} from "./index";

export const sendMail=(body)=>{
    return configAxios.post('/auth/restoration',body)
}
export const checkUser=(url)=>{
    return configAxios.get(url)
}
export const setNewPassword=(body)=>{
    return configAxios.put('/auth/reset/password',body)
}
export const setNewLogin=(body)=>{
    return configAxios.put('/auth/reset/login',body)
}