import React from 'react';
import { Tags } from '../../Utils/Tags';
import Blocks from './Blocks';
function Matches() {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tags
                    bck="#0e1731"
                    size="50px"
                    color="#ffffff"
                    
                > 
                    Matches
                </Tags>

                <Blocks />

                <Tags
                   bck="#ffffff"
                   size="22px"
                   color="#0e1731"

                   link={true}
                   linkTo="/the_team"
                   
                >
                    See more mathces
                </Tags>
            </div>
        </div>
    )
}

export default Matches;
