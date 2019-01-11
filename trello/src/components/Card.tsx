/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';
import {CardData} from '../store/TrelloApp/types';

interface cardProps{
    card: CardData,
    editCardName: any
}
interface cardState{
    card: CardData,
    cardName?: any
}
class Card  extends Component<cardProps, cardState> {
    constructor(props:cardProps) {
        super(props);
        this.state = {
            card: props.card,
            cardName: props.card.name
        }
        this.setCardName = this.setCardName.bind(this);
        this.editCardName = this.editCardName.bind(this);
    }

    setCardName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({cardName: event.target.value});
    }

    editCardName(event: any) {
        this.props.editCardName(this.state.card.id, this.state.cardName);
    }

    render() {
      return (
        <div className="card">
            <span className="cardTitle"><input type='text' value={this.state.cardName} onKeyDown={this.editCardName} onChange={this.setCardName} /></span>
        </div>
      );
    }
  }
  
  export default Card;