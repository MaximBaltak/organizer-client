import {configAxios} from "./index";

export const sendConfirmEmail=()=>{
    return configAxios.get('/confirm/send')
}
export const checkConfirmEmail=(token)=>{
    return configAxios.get(`/confirm/check?token=${token}`)
}