import React, { Component } from 'react';
import Board from './Board';
import {BoardData, BoardState} from '../store/TrelloApp/types';

interface BoardContainerProps{
    boards: BoardData[],
    setSelectedBoard: any,
    updateBoard: any,
    showSuccess: any
}

class BoardContainer  extends Component<BoardContainerProps, BoardState> {
    constructor(props: BoardContainerProps) {
        super(props);
        this.state = {
            boards: props.boards
        }
        this.setSelectedBoard = this.setSelectedBoard.bind(this);
        this.updateSelectedBoard = this.updateSelectedBoard.bind(this);
    }

    setSelectedBoard(board: BoardData){
        this.props.setSelectedBoard(board);
    }

    updateSelectedBoard(board: BoardData) {
        this.props.updateBoard(board);
    }
    
    render() {
      return this.state.boards ? (
        <section id="boards">
            <ul id="boardsContainer">
            {
            this.state.boards.map(board => {
                return <Board board={board} key={board.id} 
                showSuccess={this.props.showSuccess} onBoardSelect={this.setSelectedBoard} onBoardUpdate={this.updateSelectedBoard}/>
            })
            }  
            </ul>
        </section>
      ) : <h1>Loading</h1>;
    }
  }
  
  export default BoardContainer;