import React, { Component } from 'react';
import { WorkspaceData } from '../store/SlackApp/types';

interface WorkspaceProps{
    workspace: WorkspaceData,
    openWorkspace: any,
    onWorkspaceTitleChange: any,
    deleteWorkspace:any,
    openAddUserForm: any
}
interface WorkspaceState{
    workspace: WorkspaceData,
    workspaceTitle: string
}
class Workspace extends Component<WorkspaceProps, WorkspaceState> {
 constructor(props: WorkspaceProps){
     super(props);
     this.state={
         workspace: props.workspace,
         workspaceTitle: props.workspace.name
     };
     this.openWorkspace = this.openWorkspace.bind(this);
     this.handleTitleChange = this.handleTitleChange.bind(this);
     this.updateWorkspaceTitle = this.updateWorkspaceTitle.bind(this);
     this.deleteWorkspace = this.deleteWorkspace.bind(this);
     this.openAddUserForm = this.openAddUserForm.bind(this);
 }

 openWorkspace() {
     this.props.openWorkspace(this.state.workspace);
 }
 handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
     this.setState({workspaceTitle: event.target.value});
 }

 updateWorkspaceTitle(event: React.KeyboardEvent<HTMLInputElement>) {
     if(event.keyCode === 13) {
        this.props.onWorkspaceTitleChange(this.state.workspace.id, this.state.workspaceTitle);
     }
 }

 deleteWorkspace(){
     this.props.deleteWorkspace(this.state.workspace.id);
 }

 openAddUserForm(){
     this.props.openAddUserForm(this.state.workspace.id);
 }

  render() {
    return (
    <div id={this.state.workspace.id} className='workspace'>
      <input type="text" className="workspaceTitle" value={this.state.workspaceTitle} onChange={this.handleTitleChange} onKeyDown={this.updateWorkspaceTitle}/>
      <i className="fa fa-user-plus addUser" id={`addUser${this.state.workspace.id}`} onClick={this.openAddUserForm}></i>  
      <i className="fa fa-trash deleteWorkspace" onClick={this.deleteWorkspace}></i>
      <i className="fa fa-sign-in openWorkspace" onClick={this.openWorkspace}></i>
     </div>
    );
  }
}

export default Workspace;
