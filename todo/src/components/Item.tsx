import React, { Component } from 'react';
import {ItemData} from '../store/TodoApp/types';

interface ItemProps {
  item: ItemData,
  removeItem: any,
  updateItem: any,
  editItem: any,
  moveItem: any
}

interface itemState {
  item: ItemData,
  itemName: any
}

class Item  extends Component<ItemProps, itemState> {
  
  constructor (props: ItemProps) {
    super(props);
    this.state = {
      item: this.props.item,
      itemName: this.props.item.name
    };
    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.editItem = this.editItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
  }

  removeItem() {
    this.props.removeItem(this.state.item.id);
  }

  updateItem() {
    this.props.updateItem(this.state.item.id, this.state.item.isComplete);
  }

  inputChange(event: any) {
    this.setState({itemName: event.target.value});
  }
  
  editItem(event: any) {
    if(event.keyCode === 13) {
      this.props.editItem(this.state.item.id, event.target.value);
    }
  }
  moveItem() {
    this.props.moveItem(this.state.item.id, this.state.item.index);
  }
    render() {
      return (
        <div className="item">
          <input style={{paddingLeft:"15px"}} name="itemName" value={this.state.itemName} onChange={this.inputChange} onKeyDown={this.editItem}/>
          <div>
            <span style={{marginRight:"10px", verticalAlign:"top", fontWeight:"bold", padding:"10px", cursor:"pointer", fontSize:"x-large"}} onClick={this.moveItem}>&#8595;</span>
            <span style={{paddingLeft:"30px", color: 'red', cursor:"pointer", verticalAlign:"top", fontSize:"x-large"}} onClick={this.removeItem}>x</span>
            <span style={{marginLeft:"30px", cursor:"pointer"}} onClick={this.updateItem} className={this.state.item.isComplete ? 'complete' : 'incomplete'}></span>
          </div>
        </div>
      );
    }
  }
  
  export default Item;