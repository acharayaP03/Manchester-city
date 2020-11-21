import React from 'react'

const PlayersCard =(props) => {
    return (
        <div className="player_card_wrapper">
            <div className="player_card_thmb"
                style={{
                    background: `url(${props.bck}) #f2f9ff`
                }}
            >
            </div>
            
            <div className="player_card_nfo">
                <div className="player_card_number">{props.number}</div>
            </div>
            <div className="player_card_name">
                <span>
                    {props.name}
                </span>
                <span>
                    {props.lastname}
                </span>
            </div>
        </div>
    )
}

export default PlayersCard;
