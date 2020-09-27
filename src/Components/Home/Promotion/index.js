import React, { Component } from 'react';
import PromotionAnimation from './Animation';
import Enroll from './Enroll';

export default class Promotion extends Component {
    render() {
        return (
            <div className="promotion_wrapper" style={{background: "#FFFFFF"}}>
                <div className="container">
                    <PromotionAnimation />
                    <Enroll />
                </div>              
            </div>
        )
    }
}
