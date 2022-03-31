import React,{useState} from 'react';
import './AnswerBox.css'


export default function AnswerBox(props){

    const [color, setColor] = useState(props.color)
    
    let className = 'AnswerBox' + ' ' + color; 
    let keyValue;
     
    if (!props.keyV){
        keyValue = '';
    } else {
        keyValue = props.keyV.toLowerCase();
    }

    return (
        <div className={className}>{keyValue}</div>  
    )

}
