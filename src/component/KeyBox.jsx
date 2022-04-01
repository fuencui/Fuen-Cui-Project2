import React,{useState} from 'react';
import './KeyBox.css';
import { useDispatch } from 'react-redux';


export default function KeyBox(props){

    let keyValue = props.keyV.toUpperCase();
    let type = props.type;
    const dispatch = useDispatch();

    function handOnClick() {
        dispatch(
            {
                type:type,
                value: props.keyV,
            }
        )
    }

    return (
        <div className='KeyBox' onClick={() => handOnClick()}>{keyValue}</div>  
    )

}