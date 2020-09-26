import React, { Component } from 'react';
import { matches } from '../../../firebase';
import {firebaseLooper, reversedArr} from '../../Utils/Tags';
import RcBlocks from '../../Utils/RcBlocks'
import Slide from 'react-reveal/Slide'; 

class Blocks extends Component {
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
            console.log(match.id)
        })
    }

    showMathces =(matches)=>(
        matches ?
            matches.map((m) =>
            <Slide bottom key={m.id} >
                <div className="item">
                    <div className="wrapper">
                        <RcBlocks match={m} />
                    </div>
                </div>
            </Slide>

            ) 
        : null
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

export default Blocks;
