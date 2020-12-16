import * as actionTypes from '../actionTypes'

const registerStart = () => {
    return {type: actionTypes.REGISTER_START}
}
const registerSuccess = (firstName,phoneNumber) => {
    return {type: actionTypes.REGISTER_SUCCESSFUL, firstName: firstName, phoneNumber: phoneNumber}
}
const registerFailed = (err) => {
    return {type: actionTypes.REGISTER_FAILED, error: err}
}

export const register = (firstName, phoneNumber) => {
    return dispatch => {
        // //// here async code will be written with axios, registersuccess() calls
        // inside then() and registerFailed() calls inside catch()
        dispatch(registerSuccess(firstName, phoneNumber))

        localStorage.setItem('firstName', firstName)
        localStorage.setItem('phoneNumber', phoneNumber)
        localStorage.setItem('validated',true)
    }
}

const logoutAction = () => {
    return {type: actionTypes.LOGOUT}
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('phoneNumber')
        localStorage.removeItem('firstName')
        dispatch(logoutAction())
    }
}

const loginSuccess = (firstName,phoneNumber) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,firstName: firstName,phoneNumber: phoneNumber
    }
}

const loginFailed = (error) => {
    return {
        type: actionTypes.LOGIN_FAILED,error: error
    }
}

export const Login = (phoneNumber) => {
    return dispatch=>{
        if(phoneNumber === localStorage.getItem('phoneNumber') && localStorage.getItem('firstName')) {
            dispatch(loginSuccess(localStorage.getItem('firstName'),phoneNumber))
            localStorage.setItem('validated',true)

        }
        else if (!localStorage.getItem('firstName')) {
            dispatch(loginFailed('بخشی از اظلاعات شما پاک شده است لطفا دوباره ثبت نام کنید.'))
        }
        else {
            dispatch(loginFailed('شماره ای که وارد کرده‌اید اشتباه است'))
        }
    }
}