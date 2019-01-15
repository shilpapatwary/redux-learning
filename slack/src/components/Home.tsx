import React, { Component } from 'react';
import '../Slack.css';
import 'font-awesome/css/font-awesome.min.css';
import WorkspaceContainer from '../components/WorkspaceContainer';
import ChannelCointainer from '../components/ChannelsContainer';
import {MessageData, WorkspaceData, UserData, ChannelData} from '../store/SlackApp/types';
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
    this.startUserThread = this.startUserThread.bind(this);
    this.saveMessages = this.saveMessages.bind(this);
    this.updateWorkspaceTitle = this.updateWorkspaceTitle.bind(this);
    this.addWorkspace = this.addWorkspace.bind(this);
    this.deleteWorkspace = this.deleteWorkspace.bind(this);
    this.addUserToWorkspace = this.addUserToWorkspace.bind(this);
    this.setCurrentChannel = this.setCurrentChannel.bind(this);
  }

  showWorkspaceContainer() {
    store.dispatch({type: 'SHOW_WORKSPACES', payload:{}});
  }

  openWorkspace(workspace: WorkspaceData){
    store.dispatch({type: 'ENTER_WORKSPACE', payload:{workspace}});
  }

  addChannelToWorkspace(channel: ChannelData) {
    store.dispatch({type: 'ADD_CHANNEL', payload:{channel}});
  }

  setCurrentChannel(channel: ChannelData) {
    store.dispatch({type:'SET_CHANNEL', payload:{channel}});
  }

  startUserThread(uname: any) {
    //store.dispatch({type: 'DELETE_WORKSPACE', action:{wid}});
    // const workspaceIndex = data.workspaces.findIndex(w => w.id === this.state.currentWorkspace);
    // if(workspaceIndex >= 0){
    //  const userIndex =  data.workspaces[workspaceIndex].users.findIndex(u => u.name === uname );
    //  data.workspaces[workspaceIndex].users[userIndex].chat = true;
    //   this.setState({workspaces: data.workspaces, users: data.workspaces[workspaceIndex].users});
    // }
  }

  saveMessages(cid: string, messages:MessageData){
    store.dispatch({type: 'SUBMIT_MESSAGE', payload:{cid, messages}});
  }

  updateWorkspaceTitle(id: string, name: string) {
    store.dispatch({type: 'EDIT_WORKSPACE', payload:{id, name}});
  }

  addWorkspace(workspace: WorkspaceData){
    store.dispatch({type: 'CREATE_WORKSPACE', payload:{workspace}});
  }

  deleteWorkspace(wid: string) {
    store.dispatch({type: 'DELETE_WORKSPACE', payload:{wid}});
  }

  addUserToWorkspace(wid: string, user: UserData) {
    store.dispatch({type: 'ADD_USER_WORKSPACE', payload:{wid, user}});
  }

  // componentDidMount() {
  //   if(store) {
  //     store.subscribe(() => {
  //       this.setState({
  //         workspaces: store.getState().workspaces,
  //         currentWorkspace: store.getState().currentWorkspace,
  //         showWorkspaces: store.getState().showWorkspaces,
  //         channels: store.getState().channelsList,
  //         currentChannel: store.getState().currentChannel 
  //       });
  //     });
  //   }
  // }

  render() {
    return (
    <div>
      <section id="workspaceParentContainer">
        {this.state.showWorkspaces && this.state.workspaces && <WorkspaceContainer workspaces={this.state.workspaces} onAddUserToWorkspace={this.addUserToWorkspace} deleteWorkspace={this.deleteWorkspace} onWorkspaceTitleChange={this.updateWorkspaceTitle} openWorkspace={this.openWorkspace} addWorkspace={this.addWorkspace}></WorkspaceContainer>}
      </section>
      <section id="channelParentContainer">
        {this.state.currentWorkspace &&this.state.showChannels && this.state.channels && this.state.currentChannel && <ChannelCointainer channels={this.state.channels} 
        users={this.state.currentWorkspace.users} showWorkspaceContainer={this.showWorkspaceContainer} 
        onAddChannel={this.addChannelToWorkspace} onUserThreadStart={this.startUserThread} 
        onMessageSent={this.saveMessages} currentChannel={this.state.currentChannel} setCurrentChannel={this.setCurrentChannel}></ChannelCointainer>}
      </section>
    </div>
    );
  }
}

export default Home;
 