import { action } from 'typesafe-actions';
import { TodoActionTypes } from './types';

export const addItemAction = ( item : {}) => action(TodoActionTypes.ADD_ITEM, item);
export const editItemAction = (itemName: string, itemId:String) => action(TodoActionTypes.EDIT_ITEM, {itemName, itemId});
export const deleteItemAction = (itemId: String) => action(TodoActionTypes.DELETE_ITEM, itemId);
export const markItemAsComplete = (ItemId: String) => action(TodoActionTypes.MARK_ITEM_AS_COMPLETE, ItemId);
export const markItemAsInComplete = (ItemId: String) => action(TodoActionTypes.MARK_ITEM_AS_INCOMPLETE, ItemId);
export const moveItemAction = (itemId: String, index: number) => action(TodoActionTypes.MOVE_ITEM, {itemId, index});