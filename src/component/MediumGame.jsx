import React, {useState, useEffect} from 'react';
import './App.css'
import Keyboard from './Keyboard';
import { Navbar, Container, Nav, Dropdown, Button} from "react-bootstrap";
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import WordDisplayBar from './WordDisplayBar';
import Reminder from './Reminder';
import AnswerBoard from './AnswerBoard';
import { v4 as uuidv4 } from 'uuid';


export default function MediumGame() {
    const[words, setWords] = useState([]);
    const[solutionBoard, setsolutionBoard] = useState([]);
    const[picked, setPicked] = useState('');
    const[isReminderNotDisplay, setIsReminderNotDisplay] = useState(true);
    const[info, SetInfo] = useState('');
    const dispatch = useDispatch();


    const currentMediumWord = useSelector((state) => {
        return state.currMed;
    },shallowEqual);

    const mediumLetter = useSelector((state) => {
        return state.six;
    },shallowEqual);

    const mediumWordsList = useSelector((state) => {
        return state.listMed;
    },shallowEqual);

    const mediumGlobPicked = useSelector((state) => {
        return state.pickMed;
    },shallowEqual);

    useEffect(() => {
        let w = mediumLetter[Math.floor(Math.random() * mediumLetter.length)]
        if (mediumWordsList.length !== 0) {
            setPicked(mediumGlobPicked);
        } else {
            setPicked(w);
            dispatch({
                type: 'CHANGEMED',
                value: w ? w : '',
            })
        }

        for (let i = 0; i < 6; i++){
            if (solutionBoard.length >= 6) break;
            let array = []
            for (let j = 0; j < 6 ; j++){
                array.push({
                    char:' ',
                    color:'white',
                    })
            }
            solutionBoard.push(array)
            setsolutionBoard([...solutionBoard])
        }
    }
    ,[mediumLetter])



    function handAnswer(word){
        const array = [];
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
            type: 'LISTMED',
            value: array,
        })

    }


    function loaddingSix() {
        fetch('6-letter.txt', {mode: 'no-cors'})
        .then(response => response.text())
        .then(data =>{
                let array =  data.trim().split(" ");
                const arrLower = array.map(element => {
                    return element.toLowerCase();
                });
                dispatch({
                    type: 'SIX',
                    value: arrLower,
                })
            }
        )
        .catch(error => console.error(error));
    }

    function handSubmit(){
        if (isWordinList(currentMediumWord)){
            words.push(currentMediumWord)
            setWords([...words],checkResult(currentMediumWord)) 
            handAnswer(currentMediumWord);
        }

        dispatch(
            {
                type:'RESETMED',
                value: '',
            }
        )
    }


    function handDelete(){
        if (currentMediumWord.length >= 0){
            dispatch(
                {
                    type:'DELMED',
                    value: currentMediumWord.substring(0, currentMediumWord.length-1),
                } 
            )
        }
    }

    function isWordinList(word) {
        if (word === '') return false;
        for (let i = 0; i < mediumLetter.length; i++){
            if (mediumLetter[i] === word){
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
                type:'RESETMED',
                value: '',
            }
        )
        dispatch(
            {
                type:'ResetListMED',
                value: '',
            }
        )
        dispatch(
            {
                type:'ResetWordMED',
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
        if (words.length >= 6){
            SetInfo('Game Over! The Word is ' + picked);
            setIsReminderNotDisplay(false);
            setTimeout(() => { setIsReminderNotDisplay(true);}, 2000)
            setTimeout(() => { handReset()}, 3000)
            return;
        }
    }

    return (   
        <div className='App'> 
            {loaddingSix()}
            <div className="navbar">
                <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Fuen Cui Project 2 - Wordle</Navbar.Brand>
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
            < WordDisplayBar name={currentMediumWord} level={'medium'}/>
            < Reminder info={info} display={isReminderNotDisplay}/>
            <div className='solutionTable'>
                <div className='emptyBoard'>
                    {solutionBoard.map((item) => (
                    <AnswerBoard boardArray={item} array={null} key={uuidv4()}/>
                    ))}
                </div>
                <div>
                    {mediumWordsList.map((item) => (
                        <AnswerBoard boardArray={null} array={item} key={uuidv4()}/>
                    ))}
                </div>
            </div>
            
            <div className='wholeKeyboard'>
                <Button className='DeleteButton' onClick={() => handDelete()} variant="success">Delete</Button>
                <Button className='SubmitButton' onClick={() => handSubmit()} variant="success">Submit</Button>
                <Button className='Reset' onClick={() => handReset()} variant="primary">Reset</Button>
                <Keyboard className='keyboard' type='ADDMED'/>
            </div>
        </div>
    );
}

