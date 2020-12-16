import * as actionTypes from '../actionTypes'



const initialState = {
    EnterCount: 0,
    ExitCount: 0,
    EnterTime: null,
    ExitTime: null,
    enterDate: null
}

const timeReducer = (state = initialState, action) => { 
    switch (action.type) {
        case actionTypes.ENTER_COUNT:
            return {
                ...state,
                EnterCount: state.EnterCount+1
            }
        case actionTypes.EXIT_COUNT:
            return {
                ...state,
                ExitCount: state.ExitCount+1
            }
        case actionTypes.FILL_COUNTS:
            return {
                ...state,
                ExitCount: action.ExitCount,
                EnterCount: action.EnterCount
            }
        case actionTypes.FILL_DATES:
            return {
                ...state,
                enterDate: new Date(action.enterDate)
            }
            
    
        default:
            return state;
    }
}

export default timeReducer