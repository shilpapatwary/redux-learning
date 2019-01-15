import React, { Component } from 'react';
import { ChannelData} from '../store/SlackApp/types';

interface SendMessageProps{
    channel: ChannelData,
    submitMessage: any
}
interface SendMessageState{
    channel: ChannelData,
    inputText: any
}
class SendMessage extends Component <SendMessageProps, SendMessageState>{
constructor(props: SendMessageProps){
    super(props);
    this.state = {
        channel: props.channel,
        inputText:""
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
}

submitMessage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const elem = document.getElementById(`message${this.state.channel.id}`) as HTMLInputElement;
    this.props.submitMessage( elem.value) ;
    this.setState({inputText:''});
}

handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({inputText: event.target.value});
}
  render() {
    return (
        <div className="inputContainer">
                <form id={`messageForm${this.state.channel.id}`} data-id={this.state.channel.id}>
                    <input type="text" id={`message${this.state.channel.id}`} name="message" value={this.state.inputText} className="messageInput" onChange={this.handleInputChange}/>
                    <button className="submitMessage" id={`submit${this.state.channel.id}`} onClick={this.submitMessage}>Enter</button>
                </form>
        </div>
    );
  }
}

export default SendMessage;
