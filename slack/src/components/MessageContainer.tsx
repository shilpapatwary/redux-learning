import React, { Component } from 'react';
import MessagesHistory from './MessagesHistory';
import {ChannelData} from '../store/SlackApp/types';

interface MessageContainerProps{
  selectedChannel: ChannelData,
  saveMessages: any
}
interface MessageContainerState{
  selectedChannel: ChannelData
}
class MessageContainer extends Component<MessageContainerProps, MessageContainerState> {
 constructor(props: MessageContainerProps){
     super(props);
     this.state = {
        selectedChannel:props.selectedChannel
     }
 }

  render() {
    return (
    <div className="messageSection" id="msgSec">
        <h2 className='channelHeaderName'>{this.state.selectedChannel.name}</h2>
        <MessagesHistory channel={this.state.selectedChannel} key={this.state.selectedChannel.id} saveMessages={this.props.saveMessages}></MessagesHistory>
     </div>
    );
  }
}

export default MessageContainer;
