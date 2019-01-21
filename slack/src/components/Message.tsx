import React, { Component } from 'react';
import { MessageData } from '../store/SlackApp/types';

interface MessageProps{
    message: MessageData,
    editMessage: any,
    deleteMessage: any
}
interface MessageState{
    messageInput: string,
    isDisabled: boolean
}
class Message extends Component<MessageProps, MessageState>{
 constructor(props: MessageProps){
     super(props);
     this.state = {
         messageInput: this.props.message.message,
         isDisabled: true
     }
     this.handleInputText = this.handleInputText.bind(this);
     this.editMessage = this.editMessage.bind(this);
     this.deleteMessage = this.deleteMessage.bind(this);
     this.enableEditing = this.enableEditing.bind(this);
 }

 handleInputText(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({messageInput: event.target.value});
 }

 editMessage(event: React.KeyboardEvent<HTMLInputElement>) {
     if(event.keyCode === 13) {
         this.props.editMessage(this.props.message.id, this.state.messageInput);
     }
 }
 deleteMessage(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.props.deleteMessage(this.props.message.id);
 }
 enableEditing(event: React.MouseEvent<HTMLElement, MouseEvent> ) {
   this.setState({
       isDisabled: false
   })
 }
  render() {
    return (
        <div className="message">
            <input className='messageText' type="text" disabled={this.state.isDisabled} value={this.state.messageInput} onChange={this.handleInputText} onKeyDown={this.editMessage}/>
            <span className="messageActions">
                <i className="fa fa-pencil-square-o" onClick={this.enableEditing}></i>
                <i className="fa fa-trash-o" onClick={this.deleteMessage}></i>
            </span>
            
        </div>
    );
  }
}

export default Message;
