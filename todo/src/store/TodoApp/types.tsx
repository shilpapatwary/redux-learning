export enum TodoActionTypes {
    EDIT_ITEM = "@@types/EDIT_ITEM",
    ADD_ITEM = "@@types/ADD_ITEM",
    MOVE_ITEM = "@@types/MOVE_ITEM",
    MARK_ITEM_AS_COMPLETE = "@@types/MARK_ITEM_AS_COMPLETE",
    MARK_ITEM_AS_INCOMPLETE = "@@types/MARK_ITEM_AS_INCOMPLETE",
    DELETE_ITEM = "@@types/DELETE_ITEM"
}
export interface ItemData {
    id: string,
    name: string,
    isComplete: boolean,
    index: number
}

export interface ItemState{
    currentItem?: ItemData,
    items?: ItemData[]
}