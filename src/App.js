import React from 'react';
import {CssBaseline,ThemeProvider} from '@material-ui/core'
import Login from './Containers/Login'
import theme from './Material/Theme'
import RTL from './Material/jss-instance'
import Navbar from './Components/Navbar/index';
import Dashboard from './Containers/Dashboard/index'
import { Route, Switch } from 'react-router';

function App() {
  return (
    <RTL>
    <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline />
      <Navbar></Navbar>
      <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route path='/dashboard' component={Dashboard}></Route>
      </Switch>
    </div>
    </ThemeProvider>
    </RTL>
  );
}

export default App;
