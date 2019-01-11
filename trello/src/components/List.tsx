import React, { Component } from 'react';
import Card from './Card';
import {ListData, CardData} from '../store/TrelloApp/types';

interface ListProps{
    list: ListData,
    editCardName: any,
    editListName: any,
    addCardToList: any
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

    render() {
      return (
        <div id={this.state.listId} className="list">
                                    <div className="listTitle"><input type='text' value={this.state.listName} onChange={this.setListName} onKeyDown={this.editListName}/></div>
                                    <div className="cards">{
                                        this.state.cards ? this.state.cards.map( (card) => {
                                            return <Card card={card} key={card.id} editCardName={this.editCardName}></Card>
                                        }) : <h2>loading...</h2>
                                    }</div>
                                    <div className="addCard" onClick={this.addCardToList}>+ Add card</div>
                                </div>
      );
    }
  }
  
  export default List;