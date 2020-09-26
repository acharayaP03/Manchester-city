import React, { Component } from 'react';
import { matches } from '../../../firebase';
import {firebaseLooper, reversedArr} from '../../Utils/Tags';

export default class Blocks extends Component {
    state={
        matches: []
    }

    componentDidMount(){
        matches.limitToLast(6).once('value')
        .then((results)=>{
            //pass the result to firebaseLooper.

            const match = firebaseLooper(results)

            this.setState({
                matches: match.reverse()
            })
            //console.log(match)
        })
    }

    showMathces =()=>(
        <div>
            Mathces
        </div>
    )
    render() {
        console.log(this.state.matches)
        return (
            <div className="home_matches">
                {this.showMathces(this.state.matches)}
            </div>
        )
    }
}
