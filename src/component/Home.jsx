import React from "react";
import {Link, NavLink} from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav, Dropdown} from "react-bootstrap";
import './Home.css'

export default function Home (){


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
                    <h1>Wordle!</h1>
                    <h3>Project 2 Fuen Cui</h3>
                </div>
                <div className="nav">
                    <div>
                        <Link className='link' to="/gameRule">Game Rules</Link>
                    </div>
                    <div className="game">
                        <div>
                            <Link className='link' to={"/app"}>Easy Game</Link>
                        </div>
                        <div>
                            <Link className='link' to={"/mediumGame"}>Medium Game</Link>
                        </div>
                        <div>
                            <Link className='link' to={"/hardGame"}>Hard Game</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
}
