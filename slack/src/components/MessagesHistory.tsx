import React, { Component } from 'react';
import SendMessage from './SendMessage';
import Message from './Message';
import { ChannelData, MessageData } from '../store/SlackApp/types';

interface MessageHistoryProps{
    channel: ChannelData,
    saveMessages: any,
    editMessage: any,
    deleteMessage: any
}
interface MessageHistoryState{
    channel: ChannelData,
    messages: MessageData[]
}
class MessagesHistory extends Component<MessageHistoryProps, MessageHistoryState> {
constructor(props: MessageHistoryProps){
    super(props);
    this.state = {
        channel: props.channel,
        messages: props.channel.messages
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.editMessage  = this.editMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
}

submitMessage(message: MessageData) {
    this.props.saveMessages(this.state.channel.id, message);
}

editMessage(mid:string, message: string) {
    this.props.editMessage(this.state.channel.id, mid, message);
}

deleteMessage(mid: string){
    this.props.deleteMessage(this.state.channel.id, mid);
}

  render() {
    return (
        <div className="channelMessages" id={`messageContainer${this.state.channel.id}`}>
            <div className="messageContainer">
            {
                
                  this.state.messages.map( (message, index) => {
                    return <Message key={index} message={message} editMessage={this.editMessage} deleteMessage={this.deleteMessage}></Message>
                    })
                    
            }
            </div>
            <SendMessage channel={this.state.channel} submitMessage={this.submitMessage}></SendMessage>
        </div>
    );
  }
}

export default MessagesHistory;
