
export enum SlackActionTypes {
    CREATE_WORKSPACE = "@@types/CREATE_WORKSPACE",
    DELETE_WORKSPACE = "@@types/DELETE_WORKSPACE",
    EDIT_WORKSPACE = "@@types/EDIT_WORKSPACE",
    ENTER_WORKSPACE = "@@types/ENTER_WORKSPACE",
    ADD_USER_WORKSPACE = "@@types/ADD_USER_WORKSPACE",
    ADD_CHANNEL = "@@types/ADD_CHANNEL",
    ADD_USER_CHANNEL = "@@types/ADD_USER_CHANNEL",
    LIST_USERS = "@@types/LIST_USERS",
    SUBMIT_MESSAGE = "SUBMIT_MESSAGE"
}
export interface MessageData{
        id: string,
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