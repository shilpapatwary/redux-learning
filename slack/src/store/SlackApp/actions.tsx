import { action } from 'typesafe-actions';
import { SlackActionTypes } from './types';

export const createWorkspaceAction = ( board : {}) => action(SlackActionTypes.CREATE_WORKSPACE, board);
export const editWorkspaceAction = (boardName: string, boardId:String) => action(SlackActionTypes.EDIT_WORKSPACE, {boardName, boardId});
export const deleteWorkspaceAction = (boardId: String) => action(SlackActionTypes.DELETE_WORKSPACE, boardId);
export const enterWorkspaceAction = (boardId: String) => action(SlackActionTypes.DELETE_WORKSPACE, boardId);
export const addUserWorkspaceAction = (boardId: String) => action(SlackActionTypes.DELETE_WORKSPACE, boardId);

export const addChannelAction = (listName: string, listId:String) => action(SlackActionTypes.ADD_CHANNEL, {listName, listId});
export const addUserChannelAction = (listName: string, listId:String) => action(SlackActionTypes.ADD_USER_CHANNEL, {listName, listId});
export const listUsersAction = (itemName: string, itemId:String) => action(SlackActionTypes.LIST_USERS, {itemName, itemId});

export const submitMeessageAction = (cardName: string, cardId:String) => action(SlackActionTypes.ADD_USER_WORKSPACE, {cardName, cardId});
