import { Grid ,Box} from '@material-ui/core'
import React from 'react'
import classes from './ShowData.module.scss'

const ShowData = (props) => {

    let localEnterCount = localStorage.getItem('enterCount')

    let data = {
         enter: [],
         exit: []
}
    for (let i = 0; i < +localEnterCount; i++) {
        data.enter.push(localStorage.getItem('enter'+i));
        if(localStorage.getItem('exit0')) {
        data.exit.push(localStorage.getItem('exit'+i));
        }
        
    }

    let showEnter = data.enter.map(e=>{
    
         return   <p style={{borderBottom: '.5px solid #30475e'}} dir='ltr'>{new Date(e).getHours() + ': ' + new Date(e).getMinutes() + ': ' + new Date(e).getSeconds()}</p>
    })
    let showExit = data.exit.map(e=>{
    
         return   <p style={{borderBottom: '.5px solid #30475e'}} dir='ltr'>{new Date(e).getHours() + ': ' + new Date(e).getMinutes() + ': ' + new Date(e).getSeconds()}</p>
    })
    let days = data.enter.map(e=>{
        return   <p style={{borderBottom: '.5px solid #30475e'}}>{new Date(e).getDate() + '/ ' + (new Date(e).getMonth()+1) + '/ ' + new Date(e).getFullYear()}</p>

    })

    return(
        <div
        onClick={props.click}
        className={classes.backDrop}>
            <Grid  
            className={classes.modalCont}
            justify='center'
            alignItems='center'
            direction='row' 
            container>
                <Grid
                onClick={(e)=>{e.stopPropagation()}}
                className={classes.modal}
                xs={12}
                sm={11}
                md={6}
                lg={4}
                container
                justify='flex-start'
                alignItems='flex-start'
                direction='row'
                >
                     <div className={classes.close}></div>
                     <Grid style={{borderRight: 'none'}} className={classes.header} xs={4} item>ورود</Grid>
                     <Grid style={{borderRight: 'none'}} className={classes.header} xs={4} item>خروج</Grid>
                     <Grid style={{borderLeft: 'none',borderRight: 'none'}} className={classes.header} xs={4} item>روز</Grid>
                     <Grid className={classes.firstRow} xs={4}>{showEnter}</Grid>
                     <Grid className={classes.firstRow} xs={4}>{showExit}</Grid>
                     <Grid className={classes.firstRow} xs={4}>{days}</Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ShowData