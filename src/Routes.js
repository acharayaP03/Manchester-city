import React from 'react';
import Layouts from './Hocs/Layouts';
import {Switch, Route} from 'react-router-dom';

import Home from  './Components/Home'
import SignIn from './Components/signin';
import Dashboard from "./Components/admin/dashboard";

const Routes = (props) => {
    return (
        <Layouts>
            <Switch>
                <Route exact component={SignIn} path="/sign_in"/>
                <Route exact component={Home} path="/"/>
                <Route exact component={Dashboard} path="/dashboard"/>
            </Switch>
        </Layouts>
    )
}

export default Routes;
