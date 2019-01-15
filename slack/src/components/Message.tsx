import React, { Component } from 'react';
import { MessageData } from '../store/SlackApp/types';

interface MessageProps{
    message: MessageData
}
class Message extends Component<MessageProps, {}>{
 constructor(props: MessageProps){
     super(props);
 }

  render() {
    return (
        <div>{this.props.message}</div>
    );
  }
}

export default Message;
