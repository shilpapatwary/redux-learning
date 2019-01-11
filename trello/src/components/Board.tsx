/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';
import {BoardData} from '../store/TrelloApp/types';

 interface BoardProps{
    board: BoardData,
    onBoardUpdate: any,
    showSuccess: String,
    onBoardSelect: any,
    removeBoard: any
}

interface BoardState{
    board: BoardData,
    successClass: string,
    boardId: string,
    boardName: string
}
class Board  extends Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            board: props.board,
            boardId: props.board.id,
            successClass: props.showSuccess ? 'success' : '',
            boardName: props.board.name
        }
        this.updateBoardName = this.updateBoardName.bind(this);
        this.getBoardDetails = this.getBoardDetails.bind(this);
        this.setBoardName = this.setBoardName.bind(this);
        this.removeBoard = this.removeBoard.bind(this);
    }

    getBoardDetails(event: any) {
        this.props.onBoardSelect(this.state.board);
    }

    updateBoardName(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        event.preventDefault();
        const elem = document.getElementById(`boardTitle${this.state.boardId}`) as HTMLInputElement;
        const name = elem.value || "";
        this.props.onBoardUpdate(this.state.boardId, name);
    }

    setBoardName(event:React.ChangeEvent<HTMLInputElement>) {
        this.setState({boardName: event.target.value});
    }

    removeBoard() {
        this.props.removeBoard(this.state.boardId);
    }

    render() {
      return (
            <li className="board" id={this.state.boardId} >
                <form id={`boardUpdate${this.state.boardId}`}>
                    <div className="boardHeader">
                            <input type="text" id={`boardTitle${this.state.board.id}`} className="boardTitle" value={this.state.boardName} onChange={this.setBoardName} />
                            <span id={`update${this.state.board.id}`} className={`updateboard ${this.state.successClass} `} onClick={this.updateBoardName}>✓</span>
                            <span className="deleteboard" onClick={this.removeBoard}>X</span>
                    </div>  
                    <div className="boardBody" onClick={this.getBoardDetails}></div>
                </form>
            </li>
      );
    }
  }
  
  export default Board;