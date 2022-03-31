import { combineReducers } from "redux";

function currWord(state = '', action) {
    if (action.type === 'ADD') {
        return state + action.value;
    } else if (action.type === 'RESET'){
        return '';
    } else if (action.type === 'DEL'){
        return action.value;
    }
    return state;
}

function fiveReducer(state = [], action){
    if (action.type === 'FIVE'){
        state = action.value;
        return state;
    } else if (action.type === 'ResetWord'){
        return [];
    }
    return state;
}

function wordList(state = [], action){
    if (action.type === 'LIST'){
        state.push(action.value)
        state = [...state]
        return state;
    } else if (action.type === 'ResetList'){
        return [];
    }
    return state;
}

function golbPick(state = '', action){
    if (action.type === 'CHANGE'){
        return action.value;
    }
    return state;
}

export default combineReducers({
    curr: currWord,
    five: fiveReducer,
    list: wordList,
    pick: golbPick,

})