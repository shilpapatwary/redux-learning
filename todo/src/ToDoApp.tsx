import {ItemData} from './ToDoInterfaces';

interface CurrentState{
    items: ItemData[]
}

interface Action{
    type: String,
    payload: any
}
export default function ToDoApp(currentState: CurrentState , action: Action) {
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
        default:
            return currentState;
        
    }
}

function addItemReducer(currentState: CurrentState , action: Action) {
    const oldItems = currentState.items;
    const newItems = [...oldItems, action.payload];
    return Object.assign({}, currentState, {items: newItems});
}

function markItemAsComplete(currentState: CurrentState , action: Action) {
    const oldItems = currentState.items;
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {isComplete: true});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : null);
    return Object.assign({}, currentState, {items: newItems});
}

function removeItemReducer(currentState: CurrentState , action: Action) {
    const oldItems = currentState.items;
    const newItems = oldItems.filter(i => i.id !== action.payload.id);
    return Object.assign({}, currentState, {items: newItems});
}

function markItemAsInComplete(currentState: CurrentState , action: Action) {
    const oldItems = currentState.items;
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {isComplete: false});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : null);
    return Object.assign({}, currentState, {items: newItems});
}

function editItemReducer(currentState: CurrentState , action: Action) {
    const oldItems = currentState.items;
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {text: action.payload.text});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : i);
    return Object.assign({}, currentState, {items: newItems});
}

function moveItemReducer(currentState: CurrentState , action: Action) {
    const oldItems = currentState.items;
    const item = oldItems.filter(i => i.id === action.payload.id)[0];
    const otherItems = oldItems.filter(i => i.id !== action.payload.id);
    const leftItems = otherItems.slice(0, action.payload.index);
    const rightItems = otherItems.slice(action.payload.index + 1);
    const newItems = [...leftItems, item, ...rightItems];
    return Object.assign({}, currentState, {items: newItems});
}
