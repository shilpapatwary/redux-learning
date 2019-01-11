import { ItemState } from "./types";
import { AnyAction } from "redux";

const initialState={
    items: undefined,
    currentItem: undefined
}

const TodoApplicationReducer = (currentState: ItemState = initialState, action: AnyAction) => {
    switch(action.type) {
        case 'ADD_ITEM':
            return addItemReducer(currentState, action);
        case 'REMOVE_ITEM':
            return removeItemReducer(currentState, action);
        case 'MARK_ITEM_AS_COMPLETE':
            return markItemAsComplete(currentState, action);
        case 'MARK_ITEM_AS_INCOMEPLETE':
            return markItemAsInComplete(currentState, action);
        case 'MOVE_ITEM':
            return moveItemReducer(currentState, action);
        case 'EDIT_ITEM':
            return editItemReducer(currentState, action);
        default:
            return currentState;
        
    }
}

function addItemReducer(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const newItem = Object.assign({}, action.payload, {index: oldItems.length+1})
    const newItems = [...oldItems, newItem];
    return Object.assign({}, currentState, {items: newItems, currentItem: newItem});
}

function markItemAsComplete(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {isComplete: true});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : i);
    return Object.assign({}, currentState, {items: newItems, currentItem: newItem});
}

function removeItemReducer(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const newItems = oldItems.filter(i => i.id !== action.payload.id);
    return Object.assign({}, currentState, {items: newItems, currentItem: undefined});
}

function markItemAsInComplete(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {isComplete: false});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : i);
    return Object.assign({}, currentState, {items: newItems, currentItem: newItem});
}

function editItemReducer(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {name: action.payload.name});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : i);
    return Object.assign({}, currentState, {items: newItems, currentItem:newItem});
}

function moveItemReducer(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const item = oldItems.filter(i => i.id === action.payload.id)[0];
    const otherItems = oldItems.filter(i => i.id !== action.payload.id);
    const leftItems = otherItems.slice(0, action.payload.index);
    const rightItems = otherItems.slice(action.payload.index);
    const newItems = [...leftItems, item, ...rightItems];
    return Object.assign({}, currentState, {items: newItems, currentItem: undefined});
}

export default TodoApplicationReducer;