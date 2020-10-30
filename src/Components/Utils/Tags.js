import React from 'react';
import {Link} from 'react-router-dom';

//Resuable Tags component-> will either display normal tags or link if the {link is boolean true}
//additional ...props.add is passed to the actual imported component if we need additional styles.
export const Tags = (props) => {
    const template = <div
                        style={{
                            background:props.bck,
                            fontSize: props.size,
                            color: props.color,
                            padding: '5px 10px',
                            display: 'inline-block',
                            fontFamily: 'Righteous',
                            ...props.add
                        }}
                    >
                        {props.children}
                    </div>


    return (props.link) ? <Link to={ props.linkTo }> {template}</Link> : template 
};

/**
 * @param looper 
 * Fire base result looper  
 */
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

/**
 * 
 * @param reverse originalArr 
 */
export const reversedArr = (originalArr) =>{

    let reversedArray = originalArr.reverse();
    return reversedArray;
}

/**
 * 
 * @param {validate} element 
 * @validate email fields
 */

export const validate = (element) =>{
     
    let error = [true, ''];

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? "Must be a valid email." : ""}`;
        error = !valid ? [valid, message]: error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? "This field is required" : ""}`;

        error = !valid ? [valid, message]: error;
    }

    return error;
}