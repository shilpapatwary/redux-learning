import React, { Component } from 'react';
import ToDoList from './ToDoList';
import { ItemState } from '../store/TodoApp/types';
import {ItemData} from '../store/TodoApp/types';
import store from '..';

interface ItemProps{
  items?: ItemData[],
  currentItem?: ItemData
}

class Home  extends Component<ItemProps, ItemState> {
  
  constructor (props: ItemProps) {
    super(props);
    this.state = {
      items: props.items,
      currentItem: props.currentItem
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
  }

  addItem(newItem: ItemData) {
    store.dispatch({type:'ADD_ITEM', payload: newItem});
  }

  removeItem(id: String) {
    store.dispatch({type: 'REMOVE_ITEM', payload: {id}});
  }

  editItem(id: String, name: String) {
    store.dispatch({type: 'EDIT_ITEM', payload: {id, name}});
  }
  updateItem(id: String, isComplete: boolean) {
    isComplete ? store.dispatch({type: 'MARK_ITEM_AS_INCOMEPLETE', payload: {id}}) : store.dispatch({type: 'MARK_ITEM_AS_COMPLETE', payload: {id}});
  }

  moveItem(id: String, index: number) {
    store.dispatch({type: 'MOVE_ITEM', payload: {id, index}});
  }
  render() {

      return (
          <ToDoList items={this.state.items} currentItem={this.state.currentItem} moveItem={this.moveItem} editItem={this.editItem} updateItem={this.updateItem} addItem={this.addItem} removeItem={this.removeItem}></ToDoList>
      );
    }
  }
  
  export default Home;