import { combineReducers } from "redux";

function currWord(state = '', action) {
    if (action.type === 'ADD'){
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


function medWord(state = '', action) {
    if (action.type === 'ADDMED'){
        return state + action.value;
    } else if (action.type === 'RESETMED'){
        return '';
    } else if (action.type === 'DELMED'){
        return action.value;
    }
    return state;
}

function sixReducer(state = [], action){
    if (action.type === 'SIX'){
        state = action.value;
        return state;
    } else if (action.type === 'ResetWordMED'){
        return [];
    }
    return state;
}

function wordListMed(state = [], action){
    if (action.type === 'LISTMED'){
        state.push(action.value)
        state = [...state]
        return state;
    } else if (action.type === 'ResetListMED'){
        return [];
    }
    return state;
}

function golbPickMed(state = '', action){
    if (action.type === 'CHANGEMED'){
        return action.value;
    }
    return state;
}

function hardWord(state = '', action) {
    if (action.type === 'ADDHD'){
        return state + action.value;
    } else if (action.type === 'RESETHD'){
        return '';
    } else if (action.type === 'DELHD'){
        return action.value;
    }
    return state;
}

function sevenReducer(state = [], action){
    if (action.type === 'SEVEN'){
        state = action.value;
        return state;
    } else if (action.type === 'ResetWordHD'){
        return [];
    }
    return state;
}

function wordListHD(state = [], action){
    if (action.type === 'LISTHD'){
        state.push(action.value)
        state = [...state]
        return state;
    } else if (action.type === 'ResetListHD'){
        return [];
    }
    return state;
}

function golbPickHD(state = '', action){
    if (action.type === 'CHANGEHD'){
        return action.value;
    }
    return state;
}


export default combineReducers({
    curr: currWord,
    five: fiveReducer,
    list: wordList,
    pick: golbPick,
    currMed: medWord,
    six: sixReducer,
    listMed: wordListMed,
    pickMed: golbPickMed,
    currHD: hardWord,
    seven: sevenReducer,
    listHD: wordListHD,
    pickHD: golbPickHD,
})