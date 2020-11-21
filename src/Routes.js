import React from 'react';
import Layouts from './Hocs/Layouts';
import {Switch} from 'react-router-dom';

import Home from  './Components/Home'
import SignIn from './Components/signin';
import Dashboard from "./Components/admin/dashboard";
import PrivateRoutes from "./Components/AuthRoutes/PrivateRoutes";
import PublicRoutes from "./Components/AuthRoutes/PublicRoutes";
import Admin_Matches from "./Components/admin/AdminMatches";
import AddEditMatches from "./Components/admin/AdminMatches/AddEditMatches";
import AdminPlayers from "./Components/admin/Players";
import AdminAddPlayers from "./Components/admin/Players/AdminAddPlayers";
import TheTeam from './Components/TheTeam';
import TheMatches from './Components/TheMatches';
/**
 * 
 * @param all the props will be passed to the PrivateRoutes which will authenticate if the user is logged in or not.
 *  
 */
const Routes = (props) => {
    // console.log(props);
    return (
        <Layouts>
            <Switch>
                <PublicRoutes {...props} exact path="/" component={Home} />
                <PublicRoutes {...props} exact path="/the_team" component={TheTeam} />
                <PublicRoutes {...props} exact path="/the_matches" component={TheMatches} />
                <PublicRoutes {...props} restricted={true} exact component={SignIn} path="/sign_in"/>
                <PrivateRoutes {...props} restricted={false} exact path="/dashboard" component={Dashboard} />
                <PrivateRoutes {...props} restricted={false} exact path="/admin_matches" component={Admin_Matches} />
                <PrivateRoutes {...props} path="/admin_matches/edit_match" exact component={AddEditMatches}/>
                <PrivateRoutes {...props} restricted={false} exact path="/admin_matches/edit_match/:id" component={AddEditMatches} />
                <PrivateRoutes {...props} restricted={false} exact path="/admin_players" component={AdminPlayers} />
                <PrivateRoutes {...props} restricted={false} exact path="/admin_players/add_players" component={AdminAddPlayers} />
                <PrivateRoutes {...props} restricted={false} exact path="/admin_players/add_players/:id" component={AdminAddPlayers} />
            </Switch>
        </Layouts>
    )
}

export default Routes;
