
export enum TrelloActionTypes {
    EDIT_BOARD = "@trelloTypes/EDIT_BOARD",
    CREATE_BOARD = "@trelloTypes/CREATE_BOARD",
    ADD_LIST = "@trelloTypes/ADD_LIST",
    MOVE_LIST = "@trelloTypes/MOVE_LIST",
    EDIT_LIST = "@trelloTypes/EDIT_LIST",
    ADD_CARD = "@trelloTypes/ADD_CARD",
    EDIT_CARD = "@trelloTypes/EDIT_CARD",
    MOVE_CARD = "@trelloTypes/MOVE_CARD",
    DELETE_BOARD = "@trelloTypes/DELETE_ITEM",
    SET_BOARD = "@trelloTypes/SET_BOARD",
    SET_CURRENT_VIEW = "@trelloTypes/SET_CURRENT_VIEW"
}
export interface CardData {
        id: string,
        name: string,
        index: number
}
export interface ListData {
        id: string,
        name: string,
        cards: CardData[],
        index: number
}
export interface BoardData {
        id: string,
        name: string
        lists: ListData[] 
}

export interface BoardState{
    boards?: BoardData[],
    selectedBoard?: BoardData,
    showBoards?: boolean,
    showLists?: boolean
}