import React, { Component } from 'react';
import BoardContainer from './BoardContainer';
import ListContainer from './ListContainer';
import {BoardState, BoardData, CardData, ListData} from '../store/TrelloApp/types';
import store from '..';

interface BoardProps{
  boards?: BoardData[],
  selectedBoard?: BoardData
}

interface HomeState{ 
    boards?: BoardData[],
    selectedBoard?: BoardData,
    showBoards: boolean,
    showLists?: boolean,
    showSuccess: boolean
}

class Home  extends Component<BoardProps, HomeState> {
  constructor (props: BoardProps) {
    super (props);
    this.state = {
      boards: props.boards,
      selectedBoard: props.selectedBoard,
      showBoards: true,
      showLists: false,
      showSuccess: false
    };
    this.setSelectedBoard = this.setSelectedBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.addListToBoard = this.addListToBoard.bind(this);
    this.showBoards = this.showBoards.bind(this);
    this.addCardToList = this.addCardToList.bind(this);
    this.editListName = this.editListName.bind(this);
    this.editCardName = this.editCardName.bind(this);
  }
  
  setSelectedBoard(board: BoardData) {
    store.dispatch({type:'SET_BOARD', payload:{board}});
  }

  updateBoard(name: string) {
    store.dispatch({type:'EDIT_BOARD', payload:{name}});
  }

  addListToBoard(list: ListData) {
    store.dispatch({type:'ADD_CARD', payload:{list}});
  }

  addCardToList(listId:string, card: CardData) {
    store.dispatch({type:'ADD_CARD', payload:{listId, card}});
  }

  showBoards() {
    this.setState({ showBoards: true,
      showLists: false});
  }

  editListName(listId: String, listName: String) {
    store.dispatch({type:'EDIT_LIST', payload:{listId, listName}});
  }

  editCardName(listId: String, cardId:String, name: String) {
    store.dispatch({type: 'EDIT_CARD', payload:{listId, cardId, name}});
  }

    render() {
      return (
        <div className="rootContainer">
          <header>
            <section><h2>Trello</h2></section>
            <section className="addboard"><span className="info">Create a Board</span><span id="createBoardIcon">+</span></section>
          </header>
          <section id="content">
            { this.state.showBoards && this.state.boards? <BoardContainer boards={this.state.boards} setSelectedBoard={this.setSelectedBoard} 
            showSuccess={this.state.showSuccess} updateBoard={this.updateBoard}>
            </BoardContainer> : null}
            { this.state.showLists && this.state.selectedBoard? <ListContainer board={this.state.selectedBoard} onAddList = {this.addListToBoard} showBoards={this.showBoards} addCardToList={this.addCardToList} onlistNameEdited={this.editListName} editCardName={this.editCardName}></ListContainer> : null }
          </section>
        </div>
      );
    }
  }
  
  export default Home;