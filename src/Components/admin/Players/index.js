import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import AdminLayout from '../../../Hocs/Admin_layout';
import { players } from '../../../firebase';
import {firebaseLooper, reversedArr} from '../../Utils/Tags'

export default class AdminPlayers extends Component {
    state ={
        isLoading: true,
        players: []
    }
    componentDidMount(){
        players.once('value').then((result)=>{
            const player = firebaseLooper(result)
            this.setState({
                isLoading: false,
                players: reversedArr(player)
            })
        })
    }
    render() {
        console.log(this.state)
        return (
            <AdminLayout> 
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>      
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.players ? 
                                        this.state.players.map((result, i) =>(
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <Link to={`/admin_players/add_players/${result.id}`}>
                                                        {result.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                <Link to={`/admin_players/add_players/${result.id}`}>
                                                        {result.lastname}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {result.number}
                                                </TableCell>
                                                <TableCell>
                                                    {result.position}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className="admin_progress">
                        {
                            this.state.isLoading ?
                            <CircularProgress thickness={7} style={{color: "#98c5e9"}}/>
                            : null
                        }
                    </div>
                </div>
            </AdminLayout>
        )
    }
}
