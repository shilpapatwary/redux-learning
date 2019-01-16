import React, { Component } from 'react';
import Channel from './Channel';
import MessageContainer from './MessageContainer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { ChannelData, UserData } from '../store/SlackApp/types';

interface ChannelContainerProps{
    channels: ChannelData[],
    users: UserData[],
    showWorkspaceContainer: any,
    onAddChannel: any,
    onMessageSent: any,
    currentChannel: ChannelData,
    setCurrentChannel: any
}
interface  ChannelContainerState {
    channels: ChannelData[],
         users: UserData[],
         selectedChannel:ChannelData,
         showChannelForm: boolean,
         showMessageSection: boolean,
         showUserForm: boolean,
         hasChannels: boolean
}
class channelsContainer extends Component <ChannelContainerProps, ChannelContainerState>{
 constructor(props: ChannelContainerProps){
     super(props);
     this.state = {
         channels: props.channels,
         users: props.users,
         selectedChannel:props.currentChannel,
         showChannelForm: false,
         showMessageSection: true,
         showUserForm: false,
         hasChannels: props.channels.length > 0
     }
     this.addChannelToWorkspace = this.addChannelToWorkspace.bind(this);
     this.openChannelForm = this.openChannelForm.bind(this);
     this.openUserForm = this.openUserForm.bind(this);
     this.closeForm = this.closeForm.bind(this);
 }

 addChannelToWorkspace(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
     event.preventDefault();
    this.props.onAddChannel({
        id: `channel${Math.floor(Math.random() * 100000)}`,
        name: (document.getElementById('workspaceChannel') as HTMLInputElement).value,
        users:[],
        messages:[]
    });
    this.setState({showChannelForm: false,
        showMessageSection: true})
 }

 openChannelForm() {
     this.setState({ showChannelForm: true,
        showMessageSection: false})
 }

 
 openUserForm() {
    this.setState({ showChannelForm: false,
        showMessageSection: false,showUserForm: true})
 }

 closeForm() {
     this.setState({ showChannelForm: false,
        showMessageSection: true,
        showUserForm: false});
 }

  render() {
    return (
        <section id="channelSectionContainer">
            <section id="workspaceHeader">
                <AppBar  position="static" style= {{backgroundColor: 'inherit', textAlign:'left'}}>
                <Typography className="backButton" variant="title" color="inherit" style= {{lineHeight: '50px'}} onClick={this.props.showWorkspaceContainer}>
                <i className="fa fa-arrow-left"></i> Back To Workspaces
                    </Typography>
                </AppBar>
            </section>
            
            <section className="mainSection">
                <div className="channelsSection">
                    <div className="channelHeaderSection"><span >Channels </span><i className="fa fa-plus-square addChannel" onClick={this.openChannelForm}></i></div>
                    <ul id="channelsContainer">
                             {
                                this.state.channels.map(channel => {
                                    return <Channel key={channel.id} channel={channel} setSelectedChannel={this.props.setCurrentChannel}></Channel>
                                })
                            }
                    </ul>  
                    <div className="channelHeaderSection"><span >Direct Messages </span><i className="fa fa-plus-square" onClick={this.openUserForm}></i></div>
                    <ul id="usersThreadContainer">
                             {
                                this.state.users.map(user => {
                                   return user.chat ? <li className="workspaceUser">{user.name}</li> : null;
                                })
                            }
                    </ul> 
                </div>
               {
                   this.state.showMessageSection && this.state.hasChannels &&
                  <MessageContainer key={this.state.selectedChannel.id} selectedChannel={this.state.selectedChannel} saveMessages={this.props.onMessageSent}></MessageContainer>
               } 
                
            {
                this.state.showChannelForm && 
                <section id="addChannelForm">
                    <span><i className="fa fa-window-close close-form" aria-hidden="true" onClick={this.closeForm}></i></span>
                    <form id="addChannelToWorkspace">
                        <input type="text" id="workspaceChannel" className="channelInput" placeholder="Channel Name"/>
                        <input type="submit" id="submitWorkspaceChannel" onClick={this.addChannelToWorkspace}/>
                    </form>
                </section>
            }
            {
                this.state.showUserForm && 
                <section id="addUserForm">
                    <span><i className="fa fa-window-close close-form" aria-hidden="true" onClick={this.closeForm}></i></span>
                    <form>
                        <input type="text" id="workspaceUsername" className="userInput" placeholder="User Name"/>
                        <input type="submit"/>
                    </form>
            </section>
            }
                
            </section>
            
    </section>
    );
  }
}

export default channelsContainer;
