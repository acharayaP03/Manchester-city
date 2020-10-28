import React from 'react';
import Layouts from './Hocs/Layouts';
import {Switch, Route} from 'react-router-dom';

import Home from  './Components/Home'
import SignIn from './Components/signin';
import Dashboard from "./Components/admin/dashboard";
import PrivateRoutes from "./Components/AuthRoutes/PrivateRoutes";


/**
 * 
 * @param all the props will be passed to the PrivateRoutes which will authenticate if the user is logged in or not.
 *  
 */
const Routes = (props) => {
    console.log(props);
    return (
        <Layouts>
            <Switch>
                <Route exact component={SignIn} path="/sign_in"/>
                <Route exact component={Home} path="/"/>

                <PrivateRoutes {...props} exact path="/dashboard" component={Dashboard} />
            </Switch>
        </Layouts>
    )
}

export default Routes;
