
export enum SlackActionTypes {
    CREATE_WORKSPACE = "@@slackApp/CREATE_WORKSPACE",
    DELETE_WORKSPACE = "@@slackApp/DELETE_WORKSPACE",
    EDIT_WORKSPACE = "@@slackApp/EDIT_WORKSPACE",
    ENTER_WORKSPACE = "@@slackApp/ENTER_WORKSPACE",
    ADD_USER_WORKSPACE = "@@slackApp/ADD_USER_WORKSPACE",
    ADD_CHANNEL = "@@slackApp/ADD_CHANNEL",
    ADD_USER_CHANNEL = "@@slackApp/ADD_USER_CHANNEL",
    LIST_USERS = "@@slackApp/LIST_USERS",
    SUBMIT_MESSAGE = "@@slackApp/SUBMIT_MESSAGE",
    SHOW_WORKSPACES = "@@slackApp/SHOW_WORKSPACES",
    SET_CHANNEL = "@@slackApp/SET_CHANNEL"
}
export interface MessageData{
        message: string,
}
export interface UserData {
        id: string,
        name: string,
        index: number,
        chat: boolean
}
export interface ChannelData {
        id: string,
        name: string,
        users: UserData[],
        messages: MessageData[]
}
export interface WorkspaceData {
        id: string,
        name: string,
        users: UserData[],
        channels: ChannelData[]
}

export interface WorkspaceState{
    workspaces?: WorkspaceData[],
    currentWorkspace?: WorkspaceData,
    showWorkspaces?: boolean,
    channelsList?: ChannelData[],
    currentChannel?: ChannelData,
    showChannels?: boolean
}