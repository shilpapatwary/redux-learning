import React, { Component } from 'react';
import Card from './Card';
import {ListData, CardData} from '../store/TrelloApp/types';

interface ListProps{
    list: ListData,
    editCardName: any,
    editListName: any,
    addCardToList: any,
    moveCard: any,
    moveList: any
}

interface ListState{
    list: ListData,
    listName: any,
    listId?: string,
    cards?: CardData[]
}
class List  extends Component<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);
        this.state = {
            list: props.list,
            listName: props.list.name,
            listId: props.list.id,
            cards: props.list.cards
        }
        this.addCardToList = this.addCardToList.bind(this);
        this.editListName = this.editListName.bind(this);
        this.setListName = this.setListName.bind(this);
        this.editCardName = this.editCardName.bind(this);
        this.moveCard = this.moveCard.bind(this);
        this.moveList = this.moveList.bind(this);
    }

    addCardToList(event: any) {
        this.props.addCardToList(this.state.list.id, {
            id: `${Math.floor(Math.random() * 100000)}`,
            name: ' sample card'
        });
    }

    setListName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({listName: event.target.value});
    }

    editListName(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.keyCode === 13) {
            this.props.editListName(this.state.list.id, this.state.listName);
        }
    }

    editCardName(cid: string, name: string) {
        this.props.editCardName(this.state.list.id, cid, name);
    }

    moveCard(cardId: string,index: number) {
        this.props.moveCard(this.state.listId, cardId, index);
    }

    moveList() {
        this.props.moveList(this.state.listId, this.state.list.index);
    }
    render() {
      return (
        <div id={this.state.listId} className="list">
                                    <div className="listHeader"><input  className="listTitle" type='text' value={this.state.listName} onChange={this.setListName} onKeyDown={this.editListName}/>
                                    <span className="moveList" onClick={this.moveList}>&#8594;</span>
                                    </div>
                                    <div className="cards">{
                                        this.state.cards ? this.state.cards.map( (card) => {
                                            return <Card card={card} key={card.id} moveCard={this.moveCard} editCardName={this.editCardName}></Card>
                                        }) : <h2>loading...</h2>
                                    }</div>
                                    <div className="addCard" onClick={this.addCardToList}>+ Add card</div>
                                </div>
      );
    }
  }
  
  export default List;