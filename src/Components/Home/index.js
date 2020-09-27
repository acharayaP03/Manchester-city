import React from 'react';
import Featured from './Featured';
import Matches from './Matches';
import MeetPlayers from './MeetPlayers';

function Home() {
    return (
        <div className="bck_blue"> 
            <Featured />
            <Matches />
            <MeetPlayers />
        </div>
    )
}

export default Home;
