import React from 'react';
import Featured from './Featured';
import Matches from './Matches';
import MeetPlayers from './MeetPlayers';
import Promotion from './Promotion';

function Home() {
    return (
        <div className="bck_blue"> 
            <Featured />
            <Matches />
            <MeetPlayers />
            <Promotion/>
        </div>
    )
}

export default Home;
