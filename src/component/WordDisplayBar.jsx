import React from 'react';
import './WordDisplayBar.css';


export default function WordDisplayBar(props){

    let name = props.name;
    let level = props.level;

    if (!props.name){
        name = 'Please enter a word';
    }

    return (
        <div className={'display ' + level}>{name}</div>  
    )

}