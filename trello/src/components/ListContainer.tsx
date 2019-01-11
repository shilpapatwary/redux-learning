import React, { Component } from 'react';
import Lists from './Lists';
import {BoardData, ListData} from '../store/TrelloApp/types';

interface ListContainerProps{
    board: BoardData,
    showBoards: any,
    addCardToList: any,
    onAddList: any,
    onlistNameEdited: any,
    editCardName: any,
    moveCard: any,
    moveList: any
}

interface ListContainerState{
    board: BoardData,
    lists: ListData[]
}
class ListContainer  extends Component<ListContainerProps, ListContainerState> {
    constructor(props: ListContainerProps) {
        super(props);
        this.state = {
            board: props.board,
            lists: props.board.lists
        }
    }

    render() {
      return (
        <section id='Lists'>
            <section className="breadcrumb">
                <span id="linkBoards" onClick={this.props.showBoards}>Back to boards</span>
            </section>
            <section id={this.state.board.id} className="listSection">
                <Lists lists={this.state.board.lists} addCardToList={this.props.addCardToList} moveList={this.props.moveList} addListToBoard={this.props.onAddList} editListName={this.props.onlistNameEdited} editCardName={this.props.editCardName} moveCard={this.props.moveCard}></Lists> 
            </section>
    </section>
      );
    }
  }
  
  export default ListContainer;