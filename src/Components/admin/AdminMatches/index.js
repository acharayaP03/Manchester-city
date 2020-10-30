import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import Admin_layout from '../../../Hocs/Admin_layout';

import { matches } from '../../../firebase';
import {firebaseLooper, reversedArr} from '../../Utils/Tags'

export default class AdminMatches extends Component {

    state ={
        isLoading: true,
        matches: []
    }
    componentDidMount(){
        matches.once('value').then((result)=>{
            const match = firebaseLooper(result)
            this.setState({
                isLoading: false,
                matches: reversedArr(match)
            })
        })
    }

    render() {
        // console.log(this.state)
        return (
            <Admin_layout> 
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>      
                                    <TableCell>Date</TableCell>
                                    <TableCell>Match</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.matches ? 
                                        this.state.matches.map((result) =>(
                                            <TableRow key={result.id}>
                                                <TableCell>{result.date}</TableCell>
                                                <TableCell>
                                                    <Link to={`/admin_matches/edit_mathch/${result.id}`}>
                                                        {result.away} <strong> - </strong>{result.local}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {result.resultAway} <strong> - </strong>{result.resultLocal}
                                                </TableCell>
                                                <TableCell>
                                                    { result.final === 'Yes'
                                                        ? 
                                                            <span className="matches_tag_red">Final</span>
                                                        :
                                                            <span className="matches_tag_green">Not played yet</span>
                                                    }
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
            </Admin_layout>
        )
    }
}
