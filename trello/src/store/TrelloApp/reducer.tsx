import { BoardState, TrelloActionTypes } from "./types";
import { AnyAction } from 'redux';

const initialState = {
    boards: undefined,
    selectedBoard: undefined
}

const TodoApplicationReducer = (currentState: BoardState = initialState, action: AnyAction) => {
    switch(action.type) {
        case TrelloActionTypes.CREATE_BOARD:
            return addBoardReducer(currentState, action);
        case 'REMOVE_BOARD':
            return removeBoardReducer(currentState, action);
        case 'EDIT_BOARD':
            return editBoardReducer(currentState, action);
        case 'ADD_LIST':
            return addListReducer(currentState, action);
        //case 'EDIT_LIST':
          //  return editListReducer(currentState, action);
        //case 'MOVE_LIST':
           // return moveListReducer(currentState, action);
        //case 'ADD_CARD':
          //  return addCardReducer(currentState, action);
        case 'EDIT_CARD':
            return editCardReducer(currentState, action);
       // case 'MOVE_CARD':
            // return moveCardReducer(currentState, action);
        case 'SET_BOARD' :
            return setBoardReducer(currentState, action);
        default:
            return currentState;
        
    }
}

function setBoardReducer(currentState: BoardState, action: AnyAction) {
    return Object.assign({}, currentState, {boards: currentState.boards, selectedBoard: action.payload.board});
}

function addBoardReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const newBoard = Object.assign({}, action.payload);
    const newBoards = [...oldBoards, newBoard];
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newBoard});
}

function editBoardReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const oldItem = oldBoards.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {name: action.payload.name});
    const newBoards = oldBoards.map(i => i.id === action.payload.id ? newItem : i);
    return Object.assign({}, currentState, {items: newBoards, selectedBoard:newItem});
}

function removeBoardReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const newBoards = oldBoards.filter(i => i.id !== action.payload.id);
    return Object.assign({}, currentState, {items: newBoards, selectedBoard: undefined});
}

function addListReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const oldCurrentBoard = currentState.selectedBoard || {id:"", name:"",lists: []};
    const oldLists = oldCurrentBoard.lists || [];
    const newList = Object.assign({}, action.payload.list);
    const newLists = [...oldLists, newList];
    const newCurrentBoard = Object.assign({}, oldCurrentBoard, {lists: newLists});
    const newBoards = oldBoards.map(i => i.id === oldCurrentBoard.id ? newCurrentBoard : i);
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
}

function editListReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const oldCurrentBoard = currentState.selectedBoard || {id:"", name:"",lists: []};
   
    // const oldLists = oldCurrentBoard.lists || [];
    // const oldList = oldLists.filter(l => l.id === action.payload.listId)[0];
    // const newList = Object.assign({}, oldList, {name: action.payload.name});
    // const newLists = oldLists.map(l => l.id === action.payload.id ? newList : l);

    // const newCurrentBoard = Object.assign({}, oldCurrentBoard, {lists: newLists});
    // const newBoards = oldBoards.map(i => i.id === oldCurrentBoard.id ? newCurrentBoard : i);
    // return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
}

function addCardReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
        const oldCardList = currentState.selectedBoard.lists.filter(i => i.id ===action.payload.listId)[0].cards || [];
        const newCardList = [...oldCardList, action.payload.card];
        const newLists = currentState.selectedBoard.lists.map(l => l.id === action.payload.listId ? {...l, cards: newCardList} : l);
        const boardId = currentState.selectedBoard.id;

        const newBoards = currentState.boards.map(i => i.id === boardId ? {...newCurrentBoard, lists: newLists} : i);
        const newCurrentBoard =  {... currentState, ...{selectedBoard: {...currentState.selectedBoard, lists: newLists}}};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
    }
    // const oldBoards = currentState.boards || [];
    // const oldCurrentBoard = currentState.selectedBoard || {id:"", name:"",lists: []};
    // const oldLists = oldCurrentBoard.lists || [];
    // const oldList = oldLists.filter( i => i.id === action.payload.listId)[0];
    
    // const oldCards = oldList.cards || [];
    // const newCard = Object.assign({}, action.payload.card);
    // const newCards = [...oldCards, newCard];
    
    // const newLists = Object.assign({}, oldLists, {cards: newCards});
    // const newCurrentBoard = Object.assign({}, oldCurrentBoard, {lists: newLists});
    // const newBoards = oldBoards.map(i => i.id === oldCurrentBoard.id ? newCurrentBoard : i);
    // return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
}
function editCardReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
        const oldCardList = currentState.selectedBoard.lists.filter(i => i.id ===action.payload.listId)[0].cards || [];
        const newCardList = oldCardList.filter(c => c.id === action.payload.cardId ? {...c, name: action.payload.name} : c);
        const newLists = currentState.selectedBoard.lists.map(l => l.id === action.payload.listId ? {...l, cards: newCardList} : l);
        const boardId = currentState.selectedBoard.id;

        const newBoards = currentState.boards.map(i => i.id === boardId ? {...newCurrentBoard, lists: newLists} : i);
        const newCurrentBoard =  {... currentState, ...{selectedBoard: {...currentState.selectedBoard, lists: newLists}}};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
    }
    
}


function moveItemReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const item = oldBoards.filter(i => i.id === action.payload.id)[0];
    const otherItems = oldBoards.filter(i => i.id !== action.payload.id);
    const leftItems = otherItems.slice(0, action.payload.index);
    const rightItems = otherItems.slice(action.payload.index);
    const newBoards = [...leftItems, item, ...rightItems];
    return Object.assign({}, currentState, {items: newBoards, selectedBoard: undefined});
}

export default TodoApplicationReducer;