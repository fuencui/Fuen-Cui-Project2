import React,{useState} from 'react';
import AnswerBox from './AnswerBox';
import './AnswerBoard.css'
import { v4 as uuidv4 } from 'uuid';

export default function AnswerBoard(props) {

    const [wordList, setWordList] = useState(props.array)
    const [boardArray,setBoardArray] = useState(props.boardArray)


    function output(){
        if (wordList !== null){
            return wordList.map((item) => (
                <AnswerBox keyV={item.char} color={item.color} key={uuidv4()}/>
            ))
        } else {
            return boardArray.map((item) => (
                <AnswerBox keyV={item.char} color={item.color} key={uuidv4()}/>
            ))
        }
    }

    return (
        <div className='AnswerBoard'>
            {output()}
        </div>
    );
}
