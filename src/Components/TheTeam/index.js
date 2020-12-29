import React, { Component } from 'react';
import PlayersCard from '../Utils/PlayersCard';
import Fade from 'react-reveal';
import {Promise} from 'core-js';
import Stripes from '../../Resources/images/stripes.png';
import { players, firebase} from '../../firebase';
import { firebaseLooper } from '../Utils/Tags'

export default class TheTeam extends Component {
    state={
        isLoading: true,
        players: []
    }

    /**
     * @param images url are being loaded from firebase db,
     * loading before all the players images might break our app,
     * so to get around this we will resolve all our images with new players property 'url' then, update the state of our app.
     */
    componentDidMount(){
        players.once('value').then( result =>{
            const players = firebaseLooper(result);
            let promises = [];

            // console.log(players)
            for (let key in players){
                promises.push(
                    new Promise((resolve, reject) =>{
                        firebase.storage().ref('players')
                        .child(players[key].image).getDownloadURL()
                        .then( url =>{
                            players[key].url = url;
                            resolve();
                        })
                    })
                )
            }
            //from above we will get individual url of the image. 
            // now we will try to resolve all of the images url, 

            Promise.all(promises).then(()=>{
                this.setState({
                    isLoading: false,
                    players
                })
            }).catch(e =>{
                console.log(e.message)
            })
           
        })
    }

    showPlayersByCategory = (category) =>(
        this.state.players ? 
            this.state.players.map( (player, i) =>{
                return player.position === category ?
                    <Fade left delay={i*20} key={i}>
                        <div className="item">
                            <PlayersCard 
                                number={player.number}
                                name={player.name}
                                lastname ={player.lastname}
                                bck ={player.url}
                            />
                        </div>
                    </Fade>
                : null
            })
        :null
    )
    render() {
        // console.log(this.state.players)
        return (
            <div className="the_team_container" style={{background: `url(${Stripes}) repeat`}}>
            {
                !this.state.isLoading ?
                    <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keepers</div>
                            <div className="team_cards">
                                {this.showPlayersByCategory('Keeper')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Defenders</div>
                            <div className="team_cards">
                                {this.showPlayersByCategory('Defence')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Midfielders</div>
                            <div className="team_cards">
                                {this.showPlayersByCategory('Midfield')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Striker</div>
                            <div className="team_cards">
                                {this.showPlayersByCategory('Striker')}
                            </div>
                        </div>
                    </div>
                :null
            }
            </div>
        )
    }
}
