import React, {useEffect, useState} from 'react'
import classes from './Login.module.scss'
import {Box, Button, Grid, TextField} from '@material-ui/core'
import {connect} from 'react-redux'
import * as actions from '../store/actions/index'
import {Redirect} from 'react-router-dom'

const Login = (props) => {

    const {phoneNumber, firstName} = props

    const [form,
        setForm] = useState({firstName: '', phoneNumber: ''})
    const [LoginForm,
        setLoginForm] = useState({phoneNumber: ''})

    const [condition,
        setCondition] = useState('register')

    const localFirstName = localStorage.getItem('firstName')
    const localPhoneNumber = localStorage.getItem('phoneNumber')

    let redirect = null
    if ((phoneNumber && firstName) ) {
        redirect = <Redirect to='/dashboard'></Redirect>
    }
    useEffect(() => {

        if (localFirstName && localPhoneNumber) {
            setCondition('login')
        } else {
            setCondition('register')
        }

    }, [localFirstName, localPhoneNumber])

    return (

        <Grid
            className={classes.BodyCont}
            container
            justify='center'
            alignItems='center'>
            {redirect}
            <Grid className={classes.BoxCont} item xs={11} sm={8} md={6} lg={4}>
                {condition === 'register'
                    ? <Box boxShadow={4} className={classes.Box}>
                            <h1 className={classes}>ثبت نام</h1>
                            <p>لطفا جهت ثبت نام، نام و شماره همراه خود را وارد کنید</p>
                            <form
                                onSubmit={(e) => {
                                e.preventDefault();
                                props.register(form.firstName, form.phoneNumber)
                            }}
                                dir='ltr'>
                                <TextField
                                    value={form.firstName}
                                    onChange={(e) => {
                                    setForm({
                                        ...form,
                                        firstName: e.target.value
                                    })
                                }}
                                    type="text"
                                    className={classes.input}
                                    dir='rtl'
                                    id="outlined-basic"
                                    label="نام"
                                    variant="outlined"/>
                                <TextField
                                    value={form.phoneNumber}
                                    onChange={(e) => {
                                    setForm({
                                        ...form,
                                        phoneNumber: e.target.value
                                    })
                                }}
                                    type="number"
                                    className={classes.input}
                                    dir='ltr'
                                    id="outlined-basic"
                                    label="شماره تلفن"
                                    variant="outlined"/>
                                <Button
                                    type='submit'
                                    disabled={!form.firstName || !form.phoneNumber}
                                    className={classes.btn}
                                    variant='contained'
                                    color='primary'>ثبت نام</Button>
                            </form>
                        </Box>
                    : <Box boxShadow={4} className={classes.Box}>
                        <form
                            onSubmit={(e) => {
                            e.preventDefault();
                            props.login(LoginForm.phoneNumber)
                        }}>
                            <h1 className={classes}>ورود</h1>
                            <p>لطفا برای ورود به سیستم شماره همراه خود را وارد کنید</p>
                            <TextField
                                style={{
                                marginTop: '10%'
                            }}
                                value={LoginForm.phoneNumber}
                                onChange={(e) => {
                                setLoginForm({
                                    ...LoginForm,
                                    phoneNumber: e.target.value
                                })
                            }}
                                type="number"
                                className={classes.input}
                                dir='ltr'
                                id="outlined-basic"
                                label="شماره تلفن"
                                variant="outlined"/>
                            <Button
                                onSubmit={(e) => {
                                e.preventDefault()
                            }}
                                type='submit'
                                disabled={!LoginForm.phoneNumber}
                                className={classes.btn}
                                variant='contained'
                                color='primary'>ورود</Button>
                           <p className={classes.errorCont}>{props.error}</p> 
                        </form>
                    </Box>}
            </Grid>

        </Grid>
    )
}

const mapStateToProps = state => {
    return {loading: state.auth.loading, phoneNumber: state.auth.phoneNumber, firstName: state.auth.firstName, error: state.auth.error}
}

const mapDispatchToProps = dispatch => {
    return {
        register: (firstName, phoneNumber) => dispatch(actions.register(firstName, phoneNumber)),
        logOut: () => dispatch(actions.logout()),
        login: (phoneNumber) => dispatch(actions.Login(phoneNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)