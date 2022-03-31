import React from 'react';
import './Reminder.css'


export default function Reminder(props){

    const info = props.info
    const display = !props.display
    
    let className = display.toString()

    return (
        <div className={className}>{info}</div>  
    )

}