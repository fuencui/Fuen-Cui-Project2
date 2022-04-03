import React from "react";
import './GameRule.css';
import { Navbar, Container, Nav, Dropdown} from "react-bootstrap";

export default function GameRule() {

    return (
        <div>
            <div className="navbar">
                <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Fuen Cui Project 2 - Wordle</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/gameRule">Game Rules </Nav.Link>
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

            <div className='rule'>
                <h3>How to play</h3>
                <h5>
                    Easy Game:
                </h5>
                <span>Guess the WORDLE in seven tries. Each guess must be a valid five-letter word.</span>
                <h5>
                    Medium Game:
                </h5>
                <span>Guess the WORDLE in six tries. Each guess must be a valid six-letter word.</span>
                <h5>
                    Hard Game:
                </h5>
                <span>Guess the WORDLE in five tries. Each guess must be a valid seven-letter word.</span>
                <img src={'./rule.png'} className='img'></img>
                <span> Hit the enter button to submit.</span>
                <span>After each guess,</span>
                <span>the color of the tiles will change to show how close your guess was to the word.</span>
                
            </div>
        </div>
    )
}
