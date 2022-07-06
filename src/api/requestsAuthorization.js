import {configAxios} from "./index";

export const registration = body => {
    return configAxios.post('/auth/registration', body)
}
export const authorization = body => {
    return configAxios.post('/auth/login', body)
}