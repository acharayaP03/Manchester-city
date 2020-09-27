import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tags} from '../../Utils/Tags';
import Reveal from 'react-reveal/Reveal';
import Card from './Cards';

export default class MeetPlayers extends Component {
    state={
        show: false
    }
    render() {
        return (
            <Reveal
                fraction={0.7}
                onReveal={() =>{
                    this.setState({
                        show: true
                    })
                }}
            >
                <div className="home_meetplayers"
                    style={{
                        background: ` url(${Stripes}), linear-gradient(to right, #ffffff, #ffffff)`
                    }}
                > 
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            <div className="home_card_wrapper">
                                <Card show={this.state.show}/>
                            </div>
                            <div className="home_text_wrapper">
                                <div>
                                    <Tags 
                                        bck="#0e1731" size="100px" color="#ffffff" add={{ display:"inline-block", marginBottom: '20px'}}>
                                        Meet
                                    </Tags>
                                    <Tags 
                                        bck="#0e1731" size="100px" color="#ffffff" add={{ display:"inline-block", marginBottom: '20px'}}>
                                        The
                                    </Tags>
                                    <Tags 
                                        bck="#0e1731" size="100px" color="#ffffff" add={{ display:"inline-block", marginBottom: '20px'}}>
                                        Players
                                    </Tags>
                                </div>
                                <div>

                                <Tags 
                                    link= {true}
                                    linkTo="/the_team" 
                                    bck="#ffffff" 
                                    size="20px" 
                                    color="#0e1731" 
                                    add={{ display:"inline-block", marginBottom: '20px', border:"1px solid #0e1731"}}>
                                        Meet them here
                                    </Tags>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        )
    }
}
