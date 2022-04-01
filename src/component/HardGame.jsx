import React, {useState, useEffect} from 'react';
import './App.css'
import Keyboard from './Keyboard';
import { Navbar, Container, NavDropdown, Nav, Dropdown, Button} from "react-bootstrap";
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import WordDisplayBar from './WordDisplayBar';
import Reminder from './Reminder';
import AnswerBoard from './AnswerBoard';
import { v4 as uuidv4 } from 'uuid';


export default function HardGame() {
    const[words, setWords] = useState([]);
    const[solutionBoard, setsolutionBoard] = useState([]);
    const[picked, setPicked] = useState('');
    const[isReminderNotDisplay, setIsReminderNotDisplay] = useState(true);
    const[info, SetInfo] = useState('');
    const dispatch = useDispatch();


    const currentHardWord = useSelector((state) => {
        return state.currHD;
    },shallowEqual);

    const hardLetter = useSelector((state) => {
        return state.seven;
    },shallowEqual);

    const hardWordsList = useSelector((state) => {
        return state.listHD;
    },shallowEqual);

    const hardGlobPicked = useSelector((state) => {
        return state.pickHD;
    },shallowEqual);

    useEffect(() => {
        let w = hardLetter[Math.floor(Math.random() * hardLetter.length)]
        if (hardWordsList.length !== 0) {
            setPicked(hardGlobPicked);
        } else {
            setPicked(w);
            dispatch({
                type: 'CHANGEHD',
                value: w ? w : '',
            })
        }

        for (let i = 0; i < 5; i++){
            if (solutionBoard.length >= 5) break;
            let array = []
            for (let j = 0; j < 7 ; j++){
                array.push({
                    char:' ',
                    color:'white',
                    })
            }
            solutionBoard.push(array)
            setsolutionBoard([...solutionBoard])
        }
    }
    ,[hardLetter])



    function handAnswer(word){
        const array = [];
        console.log(picked)
        for (let i = 0; i < word.length; i++){
            for (let j = i; j < word.length; j++){
                if ((word[i] === picked[j]) && (i === j)){
                    array.push({
                        char:word[i],
                        color:'green',
                    })
                    break;
                } else if (word[i] === picked[j]){
                    array.push({
                        char:word[i],
                        color:'yellow',
                    })
                    break;
                }
                if  (j === word.length - 1){
                    array.push({
                        char:word[i],
                        color:'gray',
                    })
                    break;
                }
            }
        }
        
        dispatch({
            type: 'LISTHD',
            value: array,
        })

    }


    function loaddingSeven() {
        fetch('common-7-letter-words.txt', {mode: 'no-cors'})
        .then(response => response.text())
        .then(data =>{
                let array =  data.trim().split('\n')
                const arrLower = array.map(element => {
                    return element.toLowerCase();
                });
                dispatch({
                    type: 'SEVEN',
                    value: arrLower,
                })
            }
        )
        .catch(error => console.error(error));
    }

    function handSubmit(){
        if (isWordinList(currentHardWord)){
            words.push(currentHardWord)
            setWords([...words],checkResult(currentHardWord)) 
            handAnswer(currentHardWord);
        }

        dispatch(
            {
                type:'RESETHD',
                value: '',
            }
        )
    }


    function handDelete(){
        if (currentHardWord.length >= 0){
            dispatch(
                {
                    type:'DELHD',
                    value: currentHardWord.substring(0, currentHardWord.length-1),
                } 
            )
        }
    }

    function isWordinList(word) {
        if (word === '') return false;
        for (let i = 0; i < hardLetter.length; i++){
            if (hardLetter[i] === word){
                return true;
            }
        }
        SetInfo('Not in word list. Please try again')
        setIsReminderNotDisplay(false);
        setTimeout(() => { setIsReminderNotDisplay(true);}, 2000)
        return false;       
    }

    function handReset(){
        setWords([]);
        setsolutionBoard([]);
        setPicked('');

        dispatch(
            {
                type:'RESETHD',
                value: '',
            }
        )
        dispatch(
            {
                type:'ResetListHD',
                value: '',
            }
        )
        dispatch(
            {
                type:'ResetWordHD',
                value: '',
            }
        )
    }

    function checkResult(word){
        if(word === picked){
            SetInfo('Congratulations! The Word is ' + picked);
            setIsReminderNotDisplay(false);
            setTimeout(() => { setIsReminderNotDisplay(true);}, 2000)
            setTimeout(() => { handReset()}, 3000)
            return;
        }
        if (words.length >= 5){
            SetInfo('Game Over! The Word is ' + picked);
            setIsReminderNotDisplay(false);
            setTimeout(() => { setIsReminderNotDisplay(true);}, 2000)
            setTimeout(() => { handReset()}, 3000)
            return;
        }
    }

    return (   
        <div className='App'> 
            {loaddingSeven()}
            <div className="navbar">
                <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Wordle !!!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/gameRule">Game Rules</Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Games
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            <Dropdown.Item href="/app">easy game</Dropdown.Item>
                            <Dropdown.Item href="/mediumGame">medium game</Dropdown.Item>
                            <Dropdown.Item href="/hardGame">hard game</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
            < WordDisplayBar name={currentHardWord}/>
            < Reminder info={info} display={isReminderNotDisplay}/>
            {console.log(solutionBoard)}
            <div className='solutionTable'>
                <div className='emptyBoard'>
                    {solutionBoard.map((item) => (
                    <AnswerBoard boardArray={item} array={null} key={uuidv4()}/>
                    ))}
                </div>
                <div>
                    {hardWordsList.map((item) => (
                        <AnswerBoard boardArray={null} array={item} key={uuidv4()}/>
                    ))}
                </div>
            </div>
             
            {console.log('picked: '+ picked)}
            {console.log('words: '+ words)}
            {console.log('curr: ' + currentHardWord)}
            {console.log('five: ' + hardLetter[10])}
            {console.log('boxlist: ' + hardWordsList)}
            <div className='wholeKeyboard'>
                <Button className='DeleteButton' onClick={() => handDelete()} variant="success">Delete</Button>
                <Button className='SubmitButton' onClick={() => handSubmit()} variant="success">Submit</Button>
                <Button className='Reset' onClick={() => handReset()} variant="primary">Reset</Button>
                <Keyboard className='keyboard' type='ADDHD'/>
            </div>
        </div>
    );
}

