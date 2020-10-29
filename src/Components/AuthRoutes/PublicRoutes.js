import React from 'react'
import { Route, Redirect } from 'react-router-dom';

/**
 * 
 * @param {...rest} will contain all the props eg, exact, component, and path
 * @component if the there is user we will return Comp if not we will redirect to Signin
 * @restricted will prevent logged in user to access the sign page onec logged in. 
 * @Redirect redirects user if authenticated and allow naviaget private routes, if not auth then redirects to signin page.
 */

const PublicRoutes =({ user, component: Comp, ...rest})=> {
    return <Route 
                {...rest} 
                component={(props) =>(
                    rest.restricted 
                    ?  ( user ? <Redirect to="/dashboard" /> : <Comp {...props} user={user} /> )
                    : <Comp {...props} user={user} />
            )}
        />
}

export default PublicRoutes;
