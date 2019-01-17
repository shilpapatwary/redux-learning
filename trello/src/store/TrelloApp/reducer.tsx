import { BoardState, TrelloActionTypes } from "./types";
import { AnyAction } from 'redux';
import { Reducer } from 'redux';

const initialState: BoardState = {
    boards: undefined,
    selectedBoard: undefined,
    showBoards: undefined,
    showLists: undefined
}

const TodoApplicationReducer: Reducer<BoardState> = (currentState: BoardState = initialState, action: AnyAction) => {
    switch(action.type) {
        case TrelloActionTypes.CREATE_BOARD:
           return addBoardReducer(currentState, action);
        case TrelloActionTypes.DELETE_BOARD:
            return removeBoardReducer(currentState, action);
        case TrelloActionTypes.EDIT_BOARD:
           return editBoardReducer(currentState, action);
        case TrelloActionTypes.ADD_LIST:
            return addListReducer(currentState, action);
        case TrelloActionTypes.EDIT_LIST:
            return editListReducer(currentState, action);
        case TrelloActionTypes.MOVE_LIST:
            return moveListReducer(currentState, action);
        case TrelloActionTypes.ADD_CARD:
            return addCardReducer(currentState, action);
        case TrelloActionTypes.EDIT_CARD:
            return editCardReducer(currentState, action);
        case TrelloActionTypes.MOVE_CARD:
             return moveCardReducer(currentState, action);
        case TrelloActionTypes.SET_BOARD :
            return setBoardReducer(currentState, action);
        case TrelloActionTypes.SET_CURRENT_VIEW :
            return setCurrentViewReducer(currentState, action);
        default:
            return currentState;
        
    }
}

function setBoardReducer(currentState: BoardState, action: AnyAction) {
    return Object.assign({}, currentState, {boards: currentState.boards, selectedBoard: action.payload.board, showBoards: false,
        showLists: true});
}

function setCurrentViewReducer(currentState: BoardState, action: AnyAction) {
    return Object.assign({}, currentState, {boards: currentState.boards, selectedBoard: currentState.selectedBoard, showBoards: action.payload.showBoards,
        showLists: action.payload.showLists});
}

function addBoardReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const newBoard = Object.assign({}, action.payload.board);
    const newBoards = [...oldBoards, newBoard];
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newBoard});
}

function editBoardReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const oldBoard = oldBoards.filter(i => i.id === action.payload.id)[0];
    const newBoard = {...oldBoard, name: action.payload.name};
    const newBoards = oldBoards.map(i => i.id === action.payload.id ? newBoard : i);
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard:newBoard});
}

function removeBoardReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const newBoards = oldBoards.filter(i => i.id !== action.payload.boardId);
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard: undefined});
}

function addListReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const oldCurrentBoard = currentState.selectedBoard || {id:"", name:"",lists: []};
    const oldLists = oldCurrentBoard.lists || [];
    const newList = Object.assign({}, action.payload.list, {index: oldLists.length + 1});
    const newLists = [...oldLists, newList];
    
    const newCurrentBoard = Object.assign({}, oldCurrentBoard, {lists: newLists});
    const newBoards = oldBoards.map(i => i.id === oldCurrentBoard.id ? newCurrentBoard : i);
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
}

function editListReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
        const boardId = currentState.selectedBoard.id ;
        const oldLists = currentState.selectedBoard.lists;
        const updatedLists = oldLists.map(l => l.id === action.payload.listId ? {...l, name: action.payload.listName} : l);
        
        const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: updatedLists} : i);
        const newCurrentBoard = {...currentState.selectedBoard, lists: updatedLists};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
    }else {
        return currentState;
    }
}

function addCardReducer(currentState: BoardState , action: AnyAction) {
   if(currentState.selectedBoard && currentState.boards) {
        const oldCardList = currentState.selectedBoard.lists.filter(i => i.id ===action.payload.listId)[0].cards || [];
        const newCard = Object.assign({}, action.payload.card, {index: oldCardList.length + 1} );
        const newCardList = [...oldCardList, newCard];
        const newLists = currentState.selectedBoard.lists.map(l => l.id === action.payload.listId ? {...l, cards: newCardList} : l);
        const boardId = currentState.selectedBoard.id;

        const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: newLists} : i);
        const newCurrentBoard = {...currentState.selectedBoard, lists: newLists};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
    }else{
        return currentState;
    }
}
function editCardReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
        const oldCardList = currentState.selectedBoard.lists.filter(i => i.id ===action.payload.listId)[0].cards || [];
        const newCardList = oldCardList.map(c => c.id === action.payload.cardId ? {...c, name: action.payload.name} : c);
        const newLists = currentState.selectedBoard.lists.map(l => l.id === action.payload.listId ? {...l, cards: newCardList} : l);
        const boardId = currentState.selectedBoard.id;

        const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: newLists} : i);
        const newCurrentBoard = {...currentState.selectedBoard, lists: newLists};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
    }else {
        return currentState;
    }
    
}


function moveListReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
        const boardId = currentState.selectedBoard.id ;

        const oldLists = currentState.selectedBoard.lists;
        const currentList = oldLists.filter(l => l.id === action.payload.listId)[0];
        const otherLists = oldLists.filter(l => l.id !== action.payload.listId);

        const leftLists = otherLists.slice(0, action.payload.index);
        const rightLists = otherLists.slice(action.payload.index);
        const newLists = [...leftLists, currentList, ...rightLists];
        const newListsWithUpdatedIndex = newLists.map((l, i) => {return {...l, index: i + 1}});
 
        const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: newListsWithUpdatedIndex} : i);
        const newCurrentBoard = {...currentState.selectedBoard, lists: newListsWithUpdatedIndex};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
    }else {
        return currentState;
    }
}

function moveCardReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
        const oldCardList = currentState.selectedBoard.lists.filter(i => i.id ===action.payload.listId)[0].cards || [];
        const currentCard = oldCardList.filter(c => c.id === action.payload.cardId)[0];
        const otherCards = oldCardList.filter(i => i.id !== action.payload.cardId);

        const leftCards = otherCards.slice(0, action.payload.index);
        const rightCards = otherCards.slice(action.payload.index);
        const newCards = [...leftCards, currentCard, ...rightCards];
        const newCardsWithUpdatedIndex = newCards.map((c, i) => {return {...c, index: i + 1}});

        const newLists = currentState.selectedBoard.lists.map(l => l.id === action.payload.listId ? {...l, cards: newCardsWithUpdatedIndex} : l);
        const boardId = currentState.selectedBoard.id;

        const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: newLists} : i);
        const newCurrentBoard = {...currentState.selectedBoard, lists: newLists};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard});
    }else {
        return currentState;
    }
}
export default TodoApplicationReducer;