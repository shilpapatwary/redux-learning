import React, { Component } from 'react';
import List from './List';
import {ListData} from '../store/TrelloApp/types';

interface ListsProps{
    lists: ListData[],
    addCardToList: any,
    editCardName: any,
    editListName: any,
    addListToBoard: any,
    moveCard:any,
    moveList: any
}
interface ListsState{
    lists: ListData[],
    listName: any
}
class Lists  extends Component<ListsProps, ListsState> {
    selectedList: string;
    constructor(props: ListsProps) {
        super(props);
        this.state = {
            lists: props.lists,
            listName: ""
        }
        this.selectedList = '';
        this.addListToBoard = this.addListToBoard.bind(this);
        this.setListName = this.setListName.bind(this);
    }

    addListToBoard(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        const newList = {
            id: Math.floor(Math.random() * 100000),
            name: 'sample List',
            cards:[]
        }
        this.props.addListToBoard(newList);
    }

    setListName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({listName: e.target.value});
    }

    render() {
      return (
        <div>
             <div className="addList">
                <span id="addList" onClick={this.addListToBoard}>+ Add a list</span>
                    <form id="addListForm" className="hidden">
                    <input id="listTitle" type="text" name="listTitle" defaultValue="" onChange={this.setListName}/>
                        <button className="listSubmit">Submit</button>
                </form>
            </div>
            <div className="boardLists">
                {
                this.state.lists.map( (list, index) => {
                        return  <List key={index} list={list} moveList={this.props.moveList} moveCard={this.props.moveCard} addCardToList={this.props.addCardToList} editListName={this.props.editListName} editCardName={this.props.editCardName}></List>
                    })
                }      
            </div>
        </div>
      );
    }
  }
  
  export default Lists;