import React from 'react'
import { Link } from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem";
import {firebase} from '../../../firebase';

const AdminNav =()=> {

    const links = [
        {
            title : "Matches",
            linkTo: "/admin_matches"
        },
        {
            title : "Add Matches",
            linkTo: "/admin_matches/edit_match"
        },
        {
            title : "Players",
            linkTo: "/admin_players"
        },
        {
            title : "Add Players",
            linkTo: "/admin_players/add_players"
        }
    ]
    const style ={
        color: '#fff',
        fontWeight: '300',
        borderBottom : '1px solid #353535'
    }
    const renderNavigation = () =>(
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )
    const logoutHandler =()=>{
        firebase.auth().signOut().then(() =>{
            console.log('Logout successful');
        }).catch(err =>{
            console.log(`Error occured ${err}`)
        })
    }

    return (
        <div>
            {renderNavigation()}
            <ListItem button style={style} onClick = {()=> logoutHandler()}
            >
                Sign Out
            </ListItem>
        </div>
    )
}

export default AdminNav;
