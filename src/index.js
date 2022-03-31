import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './component/App'
import combineReducers from './reducer/reducers'
import GameRule from "./component/GameRule";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}

const store = createStore(
    combineReducers, 
    persistedState,
)

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDom.render(
<Provider store={store}>
    <Router>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/home' element={<Home/>} />
            <Route exact path='/gameRule' element={<GameRule/>} />
            <Route exact path='/app' element={<App/>} />
        </Routes>
    </Router>
    </Provider>,
document.getElementById('root')
);
