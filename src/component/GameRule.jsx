import React from "react";
import './GameRule.css';
import { Navbar, Container, NavDropdown, Nav, Dropdown} from "react-bootstrap";

export default function GameRule() {

    
    return (
        <div>
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

            <div className='welcome'>
                <h1>game ruyle</h1>
            </div>
        </div>
    )
}
