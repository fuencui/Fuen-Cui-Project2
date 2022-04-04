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


export default function App() {
    const[words, setWords] = useState([]);
    const[solutionBoard, setsolutionBoard] = useState([]);
    const[picked, setPicked] = useState('');
    const[isReminderNotDisplay, setIsReminderNotDisplay] = useState(true);
    const[info, SetInfo] = useState('');
    const dispatch = useDispatch();


    const currentWord = useSelector((state) => {
        return state.curr;
    },shallowEqual);

    const fiveLetter = useSelector((state) => {
        return state.five;
    },shallowEqual);

    const wordsList = useSelector((state) => {
        return state.list;
    },shallowEqual);

    const globPicked = useSelector((state) => {
        return state.pick;
    },shallowEqual);

    useEffect(() => {
        let w = fiveLetter[Math.floor(Math.random() * fiveLetter.length)]
        if (wordsList.length !== 0) {
            setPicked(globPicked);
        } else {
            setPicked(w);
            dispatch({
                type: 'CHANGE',
                value: w ? w : '',
            })
        }

        for (let i = 0; i < 7; i++){
            if (solutionBoard.length >= 7) break;
            let array = []
            for (let j = 0; j < 5 ; j++){
                array.push({
                    char:' ',
                    color:'white',
                    })
            }
            solutionBoard.push(array)
            setsolutionBoard([...solutionBoard])
        }
    }
    ,[fiveLetter])



    function handAnswer(word){
        const array = [];
        for (let i = 0; i < word.length; i++){
            let color = 'gray';
            for (let j = 0; j < word.length; j++){
                if ((word[i] === picked[j]) && (i === j)){
                    color = 'green';
                    break;
                } else if (word[i] === picked[j]){
                    color = 'yellow';
                }
            }
            array.push({
                char:word[i],
                color:color,
            })
        }
        
        dispatch({
            type: 'LIST',
            value: array,
        })

    }


    function loaddingFive() {
        fetch('data.txt', {mode: 'no-cors'})
        .then(response => response.text())
        .then(data =>{
                let array =  data.trim().split("\n");
                const arrLower = array.map(element => {
                    return element.toLowerCase();
                });
                dispatch({
                    type: 'FIVE',
                    value: arrLower,
                })
            }
        )
        .catch(error => console.error(error));
    }

    function handSubmit(){
        if (isWordinList(currentWord)){
            words.push(currentWord)
            setWords([...words],checkResult(currentWord)) 
            handAnswer(currentWord);
        }

        dispatch(
            {
                type:'RESET',
                value: '',
            }
        )
    }


    function handDelete(){
        if (currentWord.length >= 0){
            dispatch(
                {
                    type:'DEL',
                    value: currentWord.substring(0, currentWord.length-1),
                } 
            )
        }
    }

    function isWordinList(word) {
        if (word === '') return false;
        for (let i = 0; i < fiveLetter.length; i++){
            if (fiveLetter[i] === word){
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
                type:'RESET',
                value: '',
            }
        )
        dispatch(
            {
                type:'ResetList',
                value: '',
            }
        )
        dispatch(
            {
                type:'ResetWord',
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
        if (words.length >= 7){
            SetInfo('Game Over! The Word is ' + picked);
            setIsReminderNotDisplay(false);
            setTimeout(() => { setIsReminderNotDisplay(true);}, 2000)
            setTimeout(() => { handReset()}, 3000)
            return;
        }
    }

    return (   
        <div className='App'> 
            {loaddingFive()}
            <div className="navbar">
                <Navbar bg="light" expand="lg">
                <Container className='container'>
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

            < WordDisplayBar name={currentWord} level={'easy'}/>
            < Reminder info={info} display={isReminderNotDisplay}/>
            
            <div className='solutionTable'>
                <div className='emptyBoard'>
                    {solutionBoard.map((item) => (
                    <AnswerBoard boardArray={item} array={null} key={uuidv4()}/>
                    ))}
                </div>
                <div>
                    {wordsList.map((item) => (
                        <AnswerBoard boardArray={null} array={item} key={uuidv4()}/>
                    ))}
                </div>
            </div>

            <div className='wholeKeyboard'>
                <Button className='DeleteButton' onClick={() => handDelete()} variant="success">Delete</Button>
                <Button className='SubmitButton' onClick={() => handSubmit()} variant="success">Submit</Button>
                <Button className='Reset' onClick={() => handReset()} variant="primary">Reset</Button>
                <Keyboard className='keyboard' type='ADD'/>
            </div>
        </div>
       
    );
}

