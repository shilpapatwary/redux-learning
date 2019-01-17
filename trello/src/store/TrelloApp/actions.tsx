import { action } from 'typesafe-actions';
import { TrelloActionTypes, BoardData } from './types';

export const addBoardAction = ( board : BoardData) => action(TrelloActionTypes.CREATE_BOARD, {board});
export const editBoardAction = (name: string, id:String) => action(TrelloActionTypes.EDIT_BOARD, {name, id});
export const deleteBoardAction = (boardId: String) => action(TrelloActionTypes.DELETE_BOARD, {boardId});

export const editListAction = (listName: string, listId:String) => action(TrelloActionTypes.EDIT_LIST, {listName, listId});
export const addListAction = (listName: string, listId:String) => action(TrelloActionTypes.ADD_LIST, {listName, listId});
export const moveListAction = (listId: string, index:number) => action(TrelloActionTypes.MOVE_LIST, {listId, index});

export const editCardAction = (cardName: string, cardId:String) => action(TrelloActionTypes.EDIT_CARD, {cardName, cardId});
export const addCardAction = (cardName: string, cardId:String) => action(TrelloActionTypes.ADD_CARD, {cardName, cardId});
export const moveCardAction = (listId: string, cardId:string, index:number) => action(TrelloActionTypes.MOVE_CARD, {listId, cardId, index});

export const setBoardAction = (board: BoardData) => action(TrelloActionTypes.SET_BOARD, {board});
export const setCurrentViewAction = (showBoards: boolean, showLists: boolean) => action(TrelloActionTypes.SET_CURRENT_VIEW, {showBoards, showLists});