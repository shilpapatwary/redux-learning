import React, { Component } from 'react';
import '../Slack.css';
import 'font-awesome/css/font-awesome.min.css';
import WorkspaceContainer from '../components/WorkspaceContainer';
import ChannelCointainer from '../components/ChannelsContainer';
import {MessageData, WorkspaceData, UserData, ChannelData, SlackActionTypes} from '../store/SlackApp/types';
import {store} from '..';

interface HomeProps{
  workspaces?: WorkspaceData[],
  showWorkspaces?: boolean,
  currentWorkspace?: WorkspaceData,
  channelsList?: ChannelData[],
  currentChannel?: ChannelData,
  showChannels?: boolean
}

interface HomeState{
      workspaces?: WorkspaceData[],
      channels?:ChannelData[],
      showWorkspaces?: boolean,
      showChannels?: boolean,
      currentWorkspace?:WorkspaceData,
      currentChannel?: ChannelData
}
class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      workspaces: props.workspaces,
      channels:props.channelsList,
      showWorkspaces: props.showWorkspaces,
      showChannels: props.showChannels,
      currentWorkspace:props.currentWorkspace,
      currentChannel: props.currentChannel
    };
    this.openWorkspace = this.openWorkspace.bind(this);
    this.showWorkspaceContainer = this.showWorkspaceContainer.bind(this);
    this.addChannelToWorkspace = this.addChannelToWorkspace.bind(this);
    this.saveMessages = this.saveMessages.bind(this);
    this.updateWorkspaceTitle = this.updateWorkspaceTitle.bind(this);
    this.addWorkspace = this.addWorkspace.bind(this);
    this.deleteWorkspace = this.deleteWorkspace.bind(this);
    this.addUserToWorkspace = this.addUserToWorkspace.bind(this);
    this.setCurrentChannel = this.setCurrentChannel.bind(this);
  }

  showWorkspaceContainer() {
    store.dispatch({type: SlackActionTypes.SHOW_WORKSPACES, payload:{}});
  }

  openWorkspace(workspace: WorkspaceData){
    store.dispatch({type: SlackActionTypes.ENTER_WORKSPACE, payload:{workspace}});
  }

  addChannelToWorkspace(channel: ChannelData) {
    store.dispatch({type: SlackActionTypes.ADD_CHANNEL, payload:{channel}});
  }

  setCurrentChannel(channel: ChannelData) {
    store.dispatch({type:SlackActionTypes.SET_CHANNEL, payload:{channel}});
  }

  saveMessages(cid: string, message:MessageData){
    store.dispatch({type: SlackActionTypes.SUBMIT_MESSAGE, payload:{cid, message}});
  }

  updateWorkspaceTitle(id: string, name: string) {
    store.dispatch({type: SlackActionTypes.EDIT_WORKSPACE, payload:{id, name}});
  }

  addWorkspace(workspace: WorkspaceData){
    store.dispatch({type: SlackActionTypes.CREATE_WORKSPACE, payload:{workspace}});
  }

  deleteWorkspace(wid: string) {
    store.dispatch({type: SlackActionTypes.DELETE_WORKSPACE, payload:{wid}});
  }

  addUserToWorkspace(wid: string, user: UserData) {
    store.dispatch({type: SlackActionTypes.ADD_USER_WORKSPACE, payload:{wid, user}});
  }

  render() {
    return (
    <div>
      <section id="workspaceParentContainer">
        {this.state.showWorkspaces && this.state.workspaces && <WorkspaceContainer workspaces={this.state.workspaces} onAddUserToWorkspace={this.addUserToWorkspace} deleteWorkspace={this.deleteWorkspace} onWorkspaceTitleChange={this.updateWorkspaceTitle} openWorkspace={this.openWorkspace} addWorkspace={this.addWorkspace}></WorkspaceContainer>}
      </section>
      <section id="channelParentContainer">
        {this.state.currentWorkspace &&this.state.showChannels && this.state.channels && this.state.currentChannel && <ChannelCointainer channels={this.state.channels} 
        users={this.state.currentWorkspace.users} showWorkspaceContainer={this.showWorkspaceContainer} 
        onAddChannel={this.addChannelToWorkspace}
        onMessageSent={this.saveMessages} currentChannel={this.state.currentChannel} setCurrentChannel={this.setCurrentChannel}></ChannelCointainer>}
      </section>
    </div>
    );
  }
}

export default Home;
 