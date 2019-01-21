import { WorkspaceState, SlackActionTypes } from "./types";
import { AnyAction } from 'redux';
import { Reducer } from 'redux';
import { deleteMessageAction } from "./actions";

const initialState: WorkspaceState = {
    workspaces: undefined,
    currentWorkspace: undefined,
    showWorkspaces: undefined,
    channelsList: undefined,
    currentChannel: undefined,
    showChannels: undefined
}

const SlackApplicationReducer: Reducer<WorkspaceState> = (currentState: WorkspaceState = initialState, action: AnyAction) => {
    switch(action.type) {
        case SlackActionTypes.CREATE_WORKSPACE:
           return createWorkspaceReducer(currentState, action);
        case SlackActionTypes.DELETE_WORKSPACE:
             return removeWorksapceReducer(currentState, action);
         case SlackActionTypes.EDIT_WORKSPACE:
            return editWorkspaceReducer(currentState, action);
        case SlackActionTypes.ENTER_WORKSPACE:
            return enterWorkspaceReducer(currentState, action);
         case SlackActionTypes.ADD_USER_WORKSPACE:
             return addUserWorkspaceReducer(currentState, action);
        case SlackActionTypes.SHOW_WORKSPACES:
             return showWorkspaces(currentState, action);
        case SlackActionTypes.ADD_CHANNEL:
             return addChannelReducer(currentState, action);
        case SlackActionTypes.SET_CHANNEL:
            return setChannelReducer(currentState, action);
         case SlackActionTypes.SUBMIT_MESSAGE:
              return submitMessageReducer(currentState, action);
        case SlackActionTypes.EDIT_MESSAGE:
            return editMessageReducer(currentState, action);
        case SlackActionTypes.DELETE_MESSAGE:
            return deleteMessageReducer(currentState, action);
        default:
            return currentState;
        
    }
}

function editMessageReducer(currentState: WorkspaceState, action: AnyAction) {
    if(currentState.currentChannel && currentState.currentWorkspace && currentState.workspaces){
        const oldWorkspace = currentState.currentWorkspace;
        const newChannelMessages = currentState.currentChannel.messages.map(m => m.id === action.payload.mid ? {...m, message: action.payload.message} : m );
        const newChannel = {...currentState.currentChannel, messages: newChannelMessages};
        const newChannels = currentState.currentWorkspace.channels.map(c => c.id === action.payload.cid ? {...c, messages: newChannelMessages} : c);
       
        const newWorkspace = Object.assign({}, oldWorkspace, {channels: newChannels});
        const newWorkspaces = currentState.workspaces.map(i => i.id === oldWorkspace.id ? newWorkspace : i);
        return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace, currentChannel: newChannel, channelsList: newChannels, error:''});
   
    } else{
        return currentState;
    }
}

function deleteMessageReducer(currentState: WorkspaceState, action: AnyAction) {
    if(currentState.currentChannel && currentState.currentWorkspace && currentState.workspaces){
        const oldWorkspace = currentState.currentWorkspace;
        const newChannelMessages = currentState.currentChannel.messages.filter(m => m.id !== action.payload.mid);
        const newChannel = {...currentState.currentChannel, messages: newChannelMessages};
        const newChannels = currentState.currentWorkspace.channels.map(c => c.id === action.payload.cid ? {...c, messages: newChannelMessages} : c);
       
        const newWorkspace = Object.assign({}, oldWorkspace, {channels: newChannels});
        const newWorkspaces = currentState.workspaces.map(i => i.id === oldWorkspace.id ? newWorkspace : i);
        return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace, currentChannel: newChannel, channelsList: newChannels, error:''});
   
    } else{
        return currentState;
    }
}

function setChannelReducer(currentState: WorkspaceState, action: AnyAction) {
    return Object.assign({}, currentState, {currentChannel: action.payload.channel, error:''});
}
function enterWorkspaceReducer(currentState: WorkspaceState, action: AnyAction) {
    return Object.assign({}, currentState, {workspaces: currentState.workspaces, currentWorkspace: action.payload.workspace, showWorkspaces: false,
        showChannels: true, channelsList: action.payload.workspace.channels, error:'', currentChannel: action.payload.workspace.channels[0] });
}

function showWorkspaces(currentState: WorkspaceState, action: AnyAction) {
    return Object.assign({}, currentState, {workspaces: currentState.workspaces, currentWorkspace:undefined, showWorkspaces: true,
        showChannels: false, channelsList: undefined, currentChannel: undefined, error:''});
}

function createWorkspaceReducer(currentState: WorkspaceState , action: AnyAction) {
    const oldWorkspaces = currentState.workspaces || [];
    const newWorkspace = Object.assign({}, action.payload.workspace);
    const newWorkspaces = [...oldWorkspaces, newWorkspace];
    return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace, error:''});
}

function editWorkspaceReducer(currentState: WorkspaceState , action: AnyAction) {
    if(action.payload.name === '') {
        return Object.assign({}, currentState, {error: "Enter Workspace Name"});
    }
    const oldWorkspaces = currentState.workspaces || [];
    const oldWorkspace = oldWorkspaces.filter(i => i.id === action.payload.id)[0];
    const newWorkspace = Object.assign({}, oldWorkspace, {name: action.payload.name});
    const newWorkspaces = oldWorkspaces.map(i => i.id === action.payload.id ? newWorkspace : i);
    return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace, error:''});
}

function removeWorksapceReducer(currentState: WorkspaceState , action: AnyAction) {
    const oldWorkspaces = currentState.workspaces || [];
    const newWorkspaces = oldWorkspaces.filter(i => i.id !== action.payload.wid);
    return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: undefined, error:''});
}

function addUserWorkspaceReducer(currentState: WorkspaceState , action: AnyAction) {
    if(currentState.workspaces){
        const oldWorkspaces = currentState.workspaces;
        const oldWorkspace = oldWorkspaces.filter(w => w.id === action.payload.wid)[0];
        const oldUsers = oldWorkspace.users;
        const newUsers = [oldUsers, action.payload.user];
       
        const newWorkspace = Object.assign({}, oldWorkspace, {users: newUsers});
        const newWorkspaces = oldWorkspaces.map(i => i.id === action.payload.wid ? newWorkspace : i);
        return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace, error:''});
    }else{
        return currentState;
    }
   
}

function addChannelReducer(currentState: WorkspaceState , action: AnyAction) {
   if(currentState.currentWorkspace && currentState.workspaces) {
       if(action.payload.channel.name === ''){
           return Object.assign({}, currentState, {error: 'Enter channel name'});
       }
    const oldWorkspace = currentState.currentWorkspace;
    const oldChannels = oldWorkspace.channels;
    const newChannels = [...oldChannels, action.payload.channel];
   
    const newWorkspace = Object.assign({}, oldWorkspace, {channels: newChannels});
    const newWorkspaces = currentState.workspaces.map(i => i.id === oldWorkspace.id ? newWorkspace : i);
    return Object.assign({}, currentState, {workspaces: newWorkspaces, currentChannel: action.payload.channel ,currentWorkspace: newWorkspace, channelsList: newChannels, error:''});
    }else{
        return currentState;
    }
}


 function submitMessageReducer(currentState: WorkspaceState , action: AnyAction) {
    if(currentState.currentChannel && currentState.currentWorkspace && currentState.workspaces){
        if(action.payload.message.message === ''){
             return Object.assign({}, currentState, {error:'Enter Message'});
        }
        const oldWorkspace = currentState.currentWorkspace;
        const newChannelMessages = [...currentState.currentChannel.messages, action.payload.message];
        const newChannel = {...currentState.currentChannel, messages: newChannelMessages};
        const newChannels = currentState.currentWorkspace.channels.map(c => c.id === action.payload.cid ? {...c, messages: newChannelMessages} : c);
       
        const newWorkspace = Object.assign({}, oldWorkspace, {channels: newChannels});
        const newWorkspaces = currentState.workspaces.map(i => i.id === oldWorkspace.id ? newWorkspace : i);
        return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace, currentChannel: newChannel, channelsList: newChannels, error:''});
   
    } else{
        return currentState;
    }
 }
export default SlackApplicationReducer;