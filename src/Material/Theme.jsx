import {createMuiTheme} from '@material-ui/core'

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#30475e'
        }
    },
    overrides: {
        MuiInputLabel: {
            root: {
                fontSize:'1rem',
                color: '#30475e',
               
            }
        },
        MuiOutlinedInput: {
            root: {
                "&$focused": {
                    "borderColor": "red"
                  }
            },
            notchedOutline: {
                border: '1px solid',
                borderColor: '#30475e'
            }
        }
    }
});

export default theme