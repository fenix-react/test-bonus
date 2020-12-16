import {combineReducers} from 'redux'
import authReducer from './authReducer'
import timeReducer from './timeReducer'

const RootReducer = combineReducers({auth: authReducer,time: timeReducer})

export default RootReducer