import { action } from 'typesafe-actions';
import { SlackActionTypes, WorkspaceData, UserData, ChannelData, MessageData } from './types';

export const createWorkspaceAction = ( workspace : WorkspaceData) => action(SlackActionTypes.CREATE_WORKSPACE, {workspace});
export const editWorkspaceAction = (id: string, name:String) => action(SlackActionTypes.EDIT_WORKSPACE, {id, name});
export const deleteWorkspaceAction = (wid: String) => action(SlackActionTypes.DELETE_WORKSPACE,{wid});
export const enterWorkspaceAction = (workspace: WorkspaceData) => action(SlackActionTypes.DELETE_WORKSPACE,{workspace} );
export const addUserWorkspaceAction = (wid: string, user: UserData) => action(SlackActionTypes.DELETE_WORKSPACE, {wid, user});

export const addChannelAction = (channel: ChannelData) => action(SlackActionTypes.ADD_CHANNEL, {channel});

export const submitMessageAction = (cid: string, message: string) => action(SlackActionTypes.SUBMIT_MESSAGE, {cid, message});
export const showWorkspacesAction = () => action(SlackActionTypes.SHOW_WORKSPACES);
export const setChannelAction = (channel: ChannelData) => action(SlackActionTypes.SET_CHANNEL, {channel});