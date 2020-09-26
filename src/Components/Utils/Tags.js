import React from 'react';
import {Link} from 'react-router-dom';

export const Tags = (props) => {
    const template = <div
                        style={{
                            background:props.bck,
                            fontSize: props.size,
                            color: props.color,
                            padding: '5px 10px',
                            display: 'inline-block',
                            fontFamily: 'Righteous'
                            
                        }}
                    >
                        {props.children}
                    </div>


    return (props.link) ? <Link to={ props.linkTo }> {template}</Link> : template 
};

export const firebaseLooper = (results) =>{
    const data = [];
    results.forEach((childSnapshot) =>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data;
};


export const reversedArr = (originalArr) =>{

    let reversedArray = originalArr.reverse();
    // let reversedArray = [];

    // for(let i = originalArr.length - 1; i>=0; i--){
    //     reversedArray.push(originalArr[i]);
    // }

    return reversedArray;
}

