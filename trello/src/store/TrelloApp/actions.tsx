import { action } from 'typesafe-actions';
import { TrelloActionTypes } from './types';

export const addBoardAction = ( board : {}) => action(TrelloActionTypes.CREATE_BOARD, board);
export const editBoardAction = (boardName: string, boardId:String) => action(TrelloActionTypes.EDIT_BOARD, {boardName, boardId});
export const deleteBoardAction = (boardId: String) => action(TrelloActionTypes.DELETE_BOARD, boardId);

export const editListAction = (listName: string, listId:String) => action(TrelloActionTypes.EDIT_LIST, {listName, listId});
export const addListAction = (listName: string, listId:String) => action(TrelloActionTypes.ADD_LIST, {listName, listId});
export const moveListAction = (itemName: string, itemId:String) => action(TrelloActionTypes.MOVE_LIST, {itemName, itemId});

export const editCardAction = (cardName: string, cardId:String) => action(TrelloActionTypes.EDIT_CARD, {cardName, cardId});
export const addCardAction = (cardName: string, cardId:String) => action(TrelloActionTypes.ADD_CARD, {cardName, cardId});
export const moveCardAction = (itemName: string, itemId:String) => action(TrelloActionTypes.MOVE_CARD, {itemName, itemId});

export const setBoardAction = (board: {}) => action(TrelloActionTypes.SET_BOARD, {board});