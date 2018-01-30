import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Guest from '../components/pages/Guest.jsx'
import Profile from '../components/pages/Profile.jsx'

ReactDOM.hydrate((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Guest}/>
            {/*<Route exact path="/profile" component={Profile}/>*/}
        </Switch>
    </BrowserRouter>
), document);