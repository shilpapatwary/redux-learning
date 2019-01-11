
export enum TrelloActionTypes {
    EDIT_BOARD = "@@types/EDIT_BOARD",
    CREATE_BOARD = "@@types/CREATE_BOARD",
    ADD_LIST = "@@types/ADD_LIST",
    MOVE_LIST = "@@types/MOVE_LIST",
    EDIT_LIST = "@@types/EDIT_LIST",
    ADD_CARD = "@@types/ADD_CARD",
    EDIT_CARD = "@@types/EDIT_CARD",
    MOVE_CARD = "@@types/MOVE_CARD",
    DELETE_BOARD = "@@types/DELETE_ITEM",
    SET_BOARD = "@@types/SET_BOARD"
}
export interface CardData {
        id?: string,
        name?: string
}
export interface ListData {
        id?: string,
        name?: string,
        cards: CardData[]
}
export interface BoardData {
        id: string,
        name: string,
        successClass: string
        lists: ListData[] 
}

export interface BoardState{
    boards?: BoardData[],
    selectedBoard?: BoardData
}