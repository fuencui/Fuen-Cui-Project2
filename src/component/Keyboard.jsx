import React from 'react';
import { Component } from 'react';
import './Keyboard.css';
import KeyBox from './KeyBox';
import { Navbar, Container, NavDropdown, Nav, Dropdown, Button} from "react-bootstrap";



export default function Keyboard(props) {

    let type = props.type;

    return (
        <div className='keyboard'>
            <div className='lineOne'>
                <KeyBox keyV={'q'} type={type}/>
                <KeyBox keyV={'w'} type={type}/>
                <KeyBox keyV={'e'} type={type}/>
                <KeyBox keyV={'r'} type={type}/>
                <KeyBox keyV={'t'} type={type}/>
                <KeyBox keyV={'y'} type={type}/>
                <KeyBox keyV={'u'} type={type}/>
                <KeyBox keyV={'i'} type={type}/>
                <KeyBox keyV={'o'} type={type}/>
                <KeyBox keyV={'p'} type={type}/>
            </div>

            <div className='lineTwo'>
                <KeyBox keyV={'a'} type={type}/>
                <KeyBox keyV={'s'} type={type}/>
                <KeyBox keyV={'d'} type={type}/>
                <KeyBox keyV={'f'} type={type}/>
                <KeyBox keyV={'g'} type={type}/>
                <KeyBox keyV={'h'} type={type}/>
                <KeyBox keyV={'j'} type={type}/>
                <KeyBox keyV={'k'} type={type}/>
                <KeyBox keyV={'l'} type={type}/>
            </div>

            <div className='lineThree'>  
                <KeyBox keyV={'z'} type={type}/>
                <KeyBox keyV={'x'} type={type}/>
                <KeyBox keyV={'c'} type={type}/>
                <KeyBox keyV={'v'} type={type}/>
                <KeyBox keyV={'b'} type={type}/>
                <KeyBox keyV={'n'} type={type}/>
                <KeyBox keyV={'m'} type={type}/>
            </div>
        </div>
    );
}
