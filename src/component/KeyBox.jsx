import React,{useState} from 'react';
import './KeyBox.css';
import { useDispatch } from 'react-redux';


export default function KeyBox(props){

    let keyValue = props.keyV.toUpperCase();
    const dispatch = useDispatch();

    function handOnClick() {
        dispatch(
            {
                type:'ADD',
                value: props.keyV,
            }
        )
    }

    return (
        <div className='KeyBox' onClick={() => handOnClick()}>{keyValue}</div>  
    )

}