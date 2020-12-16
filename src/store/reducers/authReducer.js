import * as actionTypes from '../actionTypes'

const initialState = {
    firstName: '',
    phoneNumber: '',
    loading: false,
    error: null
}

const authReducer = (state = initialState, action) => { 
    switch (action.type) {
        case actionTypes.REGISTER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.REGISTER_SUCCESSFUL:
            return {
                ...state,
                firstName: action.firstName,
                phoneNumber: action.phoneNumber,
                loading: false
            }
        case actionTypes.REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                phoneNumber: null,
                firstName: null
            }
        case actionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                firstName: action.firstName,
                phoneNumber: action.phoneNumber
            }
        }
        case actionTypes.LOGIN_FAILED: {
            return {
                ...state,
                error: action.error
            }
        }
    
        default:
            return state
    }
}

export default authReducer