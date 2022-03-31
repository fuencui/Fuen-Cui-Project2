import React from 'react';
import { Component } from 'react';
import './Keyboard.css';
import KeyBox from './KeyBox';
import { Navbar, Container, NavDropdown, Nav, Dropdown, Button} from "react-bootstrap";



export default function Keyboard() {
    //render() {
    return (
        <div className='keyboard'>
            <div className='lineOne'>
                <KeyBox keyV={'q'} />
                <KeyBox keyV={'w'} />
                <KeyBox keyV={'e'} />
                <KeyBox keyV={'r'} />
                <KeyBox keyV={'t'} />
                <KeyBox keyV={'y'} />
                <KeyBox keyV={'u'} />
                <KeyBox keyV={'i'} />
                <KeyBox keyV={'o'} />
                <KeyBox keyV={'p'} />
            </div>

            <div className='lineTwo'>
                <KeyBox keyV={'a'} />
                <KeyBox keyV={'s'} />
                <KeyBox keyV={'d'} />
                <KeyBox keyV={'f'} />
                <KeyBox keyV={'g'} />
                <KeyBox keyV={'h'} />
                <KeyBox keyV={'j'} />
                <KeyBox keyV={'k'} />
                <KeyBox keyV={'l'} />
            </div>

            <div className='lineThree'>  
                <KeyBox keyV={'z'} />
                <KeyBox keyV={'x'} />
                <KeyBox keyV={'c'} />
                <KeyBox keyV={'v'} />
                <KeyBox keyV={'b'} />
                <KeyBox keyV={'n'} />
                <KeyBox keyV={'m'} />
            </div>
        </div>
    );
}
