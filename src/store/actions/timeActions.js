import * as actionTypes from '../actionTypes'

const enterCountAction = () => {
    return {type: actionTypes.ENTER_COUNT}
}

export const EnterCount = () => {
    return dispatch => {
        if (localStorage.getItem('enterCount')) {
            localStorage.setItem('enterCount', parseInt(localStorage.getItem('enterCount')) + 1)
        } else {
            localStorage.setItem('enterCount', 1)
        }
        dispatch(enterCountAction())

    }
}

const exitCountAction = () => {
    return {type: actionTypes.EXIT_COUNT}
}

export const ExitCount = () => {
    return dispatch => {
        if (localStorage.getItem('exitCount')) {
            localStorage.setItem('exitCount', parseInt(localStorage.getItem('exitCount')) + 1)
        } else {
            localStorage.setItem('exitCount', 1)
        }
        dispatch(exitCountAction())

    }
}

export const FillCounts = (enter, exit) => {
    return {type: actionTypes.FILL_COUNTS, EnterCount: enter, ExitCount: exit}
}

export const FillDates = (enter) => {
    return {type: actionTypes.FILL_DATES, enterDate: enter}
}

export const cleanUp = () => {
    return {
        type: actionTypes.CLEAN_UP
    }
}
