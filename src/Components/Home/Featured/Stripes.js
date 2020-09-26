import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';

import Animate from 'react-move/Animate';

export default class Stripes extends Component {

    state = {
        stripes :[
            {
                background: '#98c5e9', 
                left: 120,
                rotate: 25,
                top: -260,
                delay: 0
            },
            {
                background: '#FFFFFF',
                left: 360,
                rotate: 25,
                top: -397,
                delay: 200
            },
            {
                background: '#98c5e9',
                left: 600,
                rotate: 25,
                top: -498,
                delay: 400
            }
        ]
    }
    
    showStripes =()=>{
        const { stripes } = this.state;
        return stripes.map((stripe, i ) =>(
            <Animate
                key={ i}
                show={true}
                start={{
                    background: '#FFFFFF',
                    opacity: 0,
                    left: 0,
                    rotate: 0,
                    top: 0
                }}
                enter={{
                    background: stripe.background,
                    opacity: [1],
                    left: [stripe.left],
                    rotate: [stripe.rotate],
                    top: [stripe.top],
                    timing: {delay: stripe.delay, duration: 200, easePolyOut},
                    events:{
                        end(){
                            console.log('Animation Finished....')
                        }
                    }
                }}
            >
                { ({left, opacity, background, rotate, top}) => {
                        return ( 
                            <div
                                className="stripe"
                                style={{
                                    background, 
                                    opacity,
                                    transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
                                }}
                            ></div>
                        )
                    }
                }
            </Animate>
        ))
    }

    render() {
        return (
            <div className="featured_stripes">
                {this.showStripes()}
            </div>
        )
    }
}
