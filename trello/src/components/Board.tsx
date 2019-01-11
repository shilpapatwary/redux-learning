/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';
import {BoardData} from '../store/TrelloApp/types';

 interface BoardProps{
    board: BoardData,
    onBoardUpdate: any,
    showSuccess: String,
    onBoardSelect: any
}

interface BoardState{
    board: BoardData,
    successClass: string,
    boardId: string
}
class Board  extends Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            board: props.board,
            boardId: props.board.id,
            successClass: props.showSuccess ? 'success' : ''
        }
        this.updateBoardName = this.updateBoardName.bind(this);
        this.getBoardDetails = this.getBoardDetails.bind(this);
    }

    getBoardDetails(event: any) {
        this.props.onBoardSelect(this.state.board);
    }

    updateBoardName(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        const elem = document.getElementById(`boardTitle${this.state.boardId}`) as HTMLInputElement;
        const name = elem.value || "";
        this.props.onBoardUpdate(this.state.boardId, name);
    }

    render() {
      return (
            <li className="board" id={this.state.boardId}>
                <form id={`boardUpdate${this.state.boardId}`}>
                    <div className="boardHeader">
                            <input type="text" id={`boardTitle${this.state.board.id}`} className="boardTitle" value={this.state.board.name} />
                            <span id={`update${this.state.board.id}`} className={`updateboard ${this.state.successClass} `} onClick={this.updateBoardName}>✓</span>
                            <span className="deleteboard">X</span>
                    </div>  
                    <div className="boardBody" onClick={this.getBoardDetails}></div>
                </form>
            </li>
      );
    }
  }
  
  export default Board;