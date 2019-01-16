import React, { Component } from 'react';
import BoardContainer from './BoardContainer';
import ListContainer from './ListContainer';
import {BoardState, BoardData, CardData, ListData, TrelloActionTypes} from '../store/TrelloApp/types';
import store from '..';

interface BoardProps{
  boards?: BoardData[],
  selectedBoard?: BoardData,
  showBoards? : boolean,
  showLists? : boolean
}

interface HomeState{ 
    boards?: BoardData[],
    selectedBoard?: BoardData,
    showBoards?: boolean,
    showLists?: boolean,
    showSuccess: boolean
}

class Home  extends Component<BoardProps, HomeState> {
  constructor (props: BoardProps) {
    super (props);
    this.state = {
      boards: props.boards,
      selectedBoard: props.selectedBoard,
      showBoards: props.showBoards ,
      showLists: props.showLists ,
      showSuccess: false
    };
    this.setSelectedBoard = this.setSelectedBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.addListToBoard = this.addListToBoard.bind(this);
    this.showBoards = this.showBoards.bind(this);
    this.addCardToList = this.addCardToList.bind(this);
    this.editListName = this.editListName.bind(this);
    this.editCardName = this.editCardName.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.removeBoard  = this.removeBoard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
  }
  
  setSelectedBoard(board: BoardData) {
    this.setState({showBoards: false,
      showLists: true,});
    store.dispatch({type:TrelloActionTypes.SET_BOARD, payload:{board}});
  }

  updateBoard(id: string, name: string) {
    store.dispatch({type:TrelloActionTypes.EDIT_BOARD, payload:{id, name}});
  }

  addListToBoard(list: ListData) {
    store.dispatch({type:TrelloActionTypes.ADD_LIST, payload:{list}});
  }

  addCardToList(listId:string, card: CardData) {
    store.dispatch({type:TrelloActionTypes.ADD_CARD, payload:{listId, card}});
  }

  showBoards() {
   store.dispatch({type:TrelloActionTypes.SET_CURRENT_VIEW, payload:{showBoards: true, showLists: false}});
  }

  editListName(listId: String, listName: String) {
    store.dispatch({type:TrelloActionTypes.EDIT_LIST, payload:{listId, listName}});
  }

  editCardName(listId: String, cardId:String, name: String) {
    store.dispatch({type: TrelloActionTypes.EDIT_CARD, payload:{listId, cardId, name}});
  }

  moveCard(listId: string, cardId: string, index: number) {
    store.dispatch({type: TrelloActionTypes.MOVE_CARD, payload:{listId, cardId, index}});
  }

  moveList(listId: string, index: number) {
    store.dispatch({type:TrelloActionTypes.MOVE_LIST, payload:{listId, index}});
  }
  createBoard() {
    const board = {
     id:Math.random() * 10000000,
     name:"New Board",
      "lists": []
    }
    store.dispatch({type:TrelloActionTypes.CREATE_BOARD, payload: {board}});
  }

  removeBoard(boardId: string) {
    store.dispatch({type:TrelloActionTypes.DELETE_BOARD, payload: {boardId}});
  }

    render() {
      return (
        <div className="rootContainer">
          <header>
            <section><h2>Trello</h2></section>
            <section className="addboard"><span className="info">Create a Board</span><span id="createBoardIcon" onClick={this.createBoard}>+</span></section>
          </header>
          <section id="content">
            { this.state.showBoards && this.state.boards? <BoardContainer boards={this.state.boards} setSelectedBoard={this.setSelectedBoard} 
            showSuccess={this.state.showSuccess} updateBoard={this.updateBoard} removeBoard={this.removeBoard}>
            </BoardContainer> : null}
            { this.state.showLists && this.state.selectedBoard? <ListContainer moveList={this.moveList} moveCard= {this.moveCard} board={this.state.selectedBoard} onAddList = {this.addListToBoard} showBoards={this.showBoards} addCardToList={this.addCardToList} onlistNameEdited={this.editListName} editCardName={this.editCardName}></ListContainer> : null }
          </section>
        </div>
      );
    }
  }
  
  export default Home;