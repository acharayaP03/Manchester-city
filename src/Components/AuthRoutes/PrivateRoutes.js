import React from 'react'
import { Route, Redirect } from 'react-router-dom'


/**
 * 
 * @param {...rest} will contain all the props eg, exact, component, and path
 * @component if the there is user we will return Comp if not we will redirect to Signin
 * @Redirect Signin.
 */
const PrivateRoute =({ user, component: Comp, ...rest})=> {
    return <Route 
        {...rest}
        component ={(props) =>(
            user ?
                <Comp {...props} user = {user}/>
                : 
                <Redirect to="/sign_in" />
        )} 
    />
}

export default PrivateRoute
