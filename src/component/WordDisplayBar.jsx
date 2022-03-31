import React from 'react';
import './WordDisplayBar.css';


export default function WordDisplayBar(props){

    let name = props.name;
    if (!props.name){
        name = 'Please enter a word';
    }

    return (
        <div className='display'>{name}</div>  
    )

}