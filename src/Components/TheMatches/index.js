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
    showPlayed = (played) => {
        const list = this.state.matches.filter((match)=>{
            return match.final === played
        });
        
        this.setState({
            filterMatches: played === 'All' ? this.state.matches : list,
            playedFilter: played,
            resultFilter: 'All'
        })
    }

    showResult = (result) => {
        const list = this.state.matches.filter((match)=>{
            return match.result === result
        });
        
        this.setState({
            filterMatches: result === 'All' ? this.state.matches : list,
            playedFilter: 'All',
            resultFilter: result
        })
    }
    render() {
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                        <div className="match_filters_box">
                                <div className="tag">
                                    Show Match
                                </div>
                                <div className="cont">
                                    <div className={`option ${state.playedFilter === 'All'?'active':''}`}
                                        onClick={()=> this.showPlayed('All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${state.playedFilter === 'Yes'?'active':''}`}
                                        onClick={()=> this.showPlayed('Yes')}>
                                        Played
                                    </div>
                                    <div className={`option ${state.playedFilter === 'No'?'active':''}`}
                                        onClick={()=> this.showPlayed('No')}>
                                        Not played
                                    </div>
                                </div>
                            </div>
                            <div className="match_filters_box">
                                <div className="tag">
                                    Result game
                                </div>
                                <div className="cont">
                                    <div className={`option ${state.resultFilter === 'All'?'active':''}`}
                                        onClick={()=> this.showResult('All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${state.resultFilter === 'W'?'active':''}`}
                                        onClick={()=> this.showResult('W')}>
                                        W
                                    </div>
                                    <div className={`option ${state.resultFilter === 'L'?'active':''}`}
                                        onClick={()=> this.showResult('L')}>
                                        L
                                    </div>
                                    <div className={`option ${state.resultFilter === 'D'?'active':''}`}
                                        onClick={()=> this.showResult('D')}>
                                        D
                                    </div>
                                </div>
                            </div>
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
