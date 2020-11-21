import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { matches } from '../../firebase';
import { firebaseLooper, reversedArr } from '../Utils/Tags';
import MatchTable from '../TheMatches/MatchTable';
import MatchesList from './MatchesList'


export default class TheMatches extends Component {
    state = {
        isLoading: true,
        matches: [],
        filterMatches: [],
        playerFilter: ['All'],
        resultFilter: []
    }

    componentDidMount(){
        matches.once('value').then((result) =>{
            const resultMatches = firebaseLooper(result);

            this.setState({
                isLoading: false,
                matches: reversedArr(resultMatches),
                filterMatches: reversedArr(resultMatches)
            })
        })
    }
    render() {
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                        </div>
                        <MatchesList matches={state.filterMatches}/>
                    </div>
                    <div className="right">
                        <MatchTable />
                    </div>
                </div>
            </div>
        )
    }
}
