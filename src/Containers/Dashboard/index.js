import React, {useEffect, useState} from 'react'
import classes from './index.module.scss'
import {Redirect} from 'react-router-dom'
import {Box, Grid} from '@material-ui/core'
import {ImExit, ImEnter} from 'react-icons/im'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

const Dashboard = props => {

    // Fill Redux State from localStorage with fillCOunts(number of enters and exits)
    // and filldates(dates of enter and exit)
    const {fillCounts, filldates} = props

    //state for disabling exit button until 10 mins
    const [disableExitButton,
        setDisableExitButton] = useState(false)

    //Messages to show to user
    const [msg,
        setMsg] = useState('')

    //remove validated after closing window.(for redirecting to login page)
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('validated')
    })

    //logout user if not authenticated
    let redirect = null
    if (!localStorage.getItem('phoneNumber') || !localStorage.getItem('firstName')) {
        redirect = <Redirect to='/'></Redirect>
    } else if (!localStorage.getItem('validated')) {
        redirect = <Redirect to='/'></Redirect>
    }

    //pass parameteres from localStorage to redux

    const localEnterCount = parseInt(localStorage.getItem('enterCount'))
    const localExitCount = parseInt(localStorage.getItem('exitCount'))
    const localEnterDate = localStorage.getItem('enter' + (localEnterCount - 1))
    const localExitDate = localStorage.getItem('exite' + (localExitCount - 1))

    useEffect(() => {
        if (localEnterCount && !localExitCount) {
            fillCounts(localEnterCount, 0)
            filldates(localEnterDate)
            let date = new Date(localEnterDate)
            let msg = `ورود شما در زمان ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()} ثبت شد. شما تا زمان ${date.getHours() + ':' + (date.getMinutes() + 10) + ':' + date.getSeconds()} اجازه خروج ندارید`
            setMsg(msg)
        } else if (localEnterCount && localExitCount) {
            fillCounts(localEnterCount, localExitCount)
            const localEnterDate = localStorage.getItem('enter' + (localEnterCount - 1))
            filldates(localEnterDate, localExitDate)
            if (localEnterCount > localExitCount) {
                let date = new Date(localEnterDate)
                let msg = `ورود شما در زمان ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()} ثبت شد. شما تا زمان ${date.getHours() + ':' + (date.getMinutes() + 10) + ':' + date.getSeconds()} اجازه خروج ندارید`
                setMsg(msg)
            }
        }

    }, [
        localEnterCount,
        fillCounts,
        localExitCount,
        filldates,
        localEnterDate,
        localExitDate
    ])

    //add enter times to localStorage
    const handleAddTime = () => {
        if (!localStorage.getItem('enterCount')) {

            let date = new Date()
            localStorage.setItem('enter0', date)
            let msg = `ورود شما در زمان ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()} ثبت شد. شما تا زمان ${date.getHours() + ':' + (date.getMinutes() + 10) + ':' + date.getSeconds()} اجازه خروج ندارید`
            setMsg(msg)
            setDisableExitButton(true)
            setTimeout(() => {
                console.log('triiggered')
                setDisableExitButton(false)
            }, 15000);

        } else {

            let i = localEnterCount
            let date = new Date()
            localStorage.setItem('enter' + i, date)
            let msg = `ورود شما در زمان ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()} ثبت شد. شما تا زمان ${date.getHours() + ':' + (date.getMinutes() + 10) + ':' + date.getSeconds()} اجازه خروج ندارید`
            setMsg(msg)
            setDisableExitButton(true)

            setTimeout(() => {
                console.log('triiggered')
                setDisableExitButton(false)
            }, 15000);
        }

    }

    //add exit times to localStorage
    const handleAddExitTime = () => {
        if (!localStorage.getItem('exitCount')) {
            let date = new Date()
            localStorage.setItem('exit0', date)
        } else {
            let i = localExitCount
            let date = new Date()
            localStorage.setItem('exite' + i, date)

        }
    }

    return (
        <Box boxShadow={4} className={classes.container}>
            <h3 className={classes.name}>خوش آمدید {localStorage.getItem('firstName')}
                !</h3>
            <p className={classes.hint}>بعد از ثبت ورود تا ده دقیقه مجاز به ثبت خروج نیستید</p>
            <p className={classes.hint}>توجه داشته باشید که در روز ‌های تعطیل مجاز به ثبت ورود و خروج نیستید</p>
            <Grid
                container
                direction='row'
                justify='space-around'
                alignItems='center'
                className={classes.btnsCont}>
                <Grid item xs={12} md={6} lg={4} className={classes.btnBox}>
                    <button
                        disabled={props.enterCount > props.exitCount}
                        onClick={() => {
                        handleAddTime();
                        props.addEnterCount()
                    }}
                        className={classes.btn}>
                        <ImEnter className={classes.icon}></ImEnter>
                        <p>ثبت ورود</p>
                    </button>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className={classes.btnBox}>
                    <button
                        disabled={(props.enterCount <= props.exitCount) || disableExitButton}
                        onClick={() => {
                        handleAddExitTime();
                        props.addExitCount();
                    }}
                        className={classes.btn}>
                        <ImExit className={classes.icon}></ImExit>
                        <p>ثبت خروج</p>
                    </button>

                </Grid>
                <div className={classes.msgCont}>
                    {msg}
                </div>
            </Grid>
            {redirect}
        </Box>
    )
}

const mapStateToProps = state => {
    return {enterCount: state.time.EnterCount, exitCount: state.time.ExitCount, enterDate: state.time.enterDate}
}

const mapDispatchToProps = dispatch => {
    return {
        addEnterCount: () => dispatch(actions.EnterCount()),
        addExitCount: () => dispatch(actions.ExitCount()),
        fillCounts: (enter, exit) => dispatch(actions.FillCounts(enter, exit)),
        filldates: (enter) => dispatch(actions.FillDates(enter))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)