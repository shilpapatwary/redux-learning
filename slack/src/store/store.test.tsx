import chai from 'chai';
import store from '.';
import {editWorkspaceAction, addChannelAction, setChannelAction, submitMessageAction, deleteWorkspaceAction} from './SlackApp/actions';

chai.should();
describe('SlackApplicationStore', function() {
  describe('store.dispatch(editWorkspaceAction("updated workspace"))', function() {
    it('should update workpace name', function() {
      store.dispatch(editWorkspaceAction('123456','updated workspace'));
      store.getState().currentWorkspace.should.have.property('name').and.equal('updated workspace');
    });
  });
  describe('store.dispatch(addChannelAction()', function() {
    it('should create a new channel in workspace', function() {
      store.dispatch(addChannelAction({
        id : "abcde123",
        name : "random2",
        users:[],
        messages:[]
    }));
      store.getState().currentWorkspace.should.have.property('channels').to.be.an('array').that.is.not.empty;
      store.getState().currentWorkspace.should.have.property('channels').to.be.an('array').to.have.lengthOf(3);
    });
  });
  describe('store.dispatch(setChannelAction()', function() {
    it('should create a new channel in workspace', function() {
      store.dispatch(setChannelAction({
        id : "abcde123",
        name : "random2",
        users:[],
        messages:[]
    }));
      store.getState().currentChannel.should.not.be.empty;
      store.getState().currentChannel.should.have.property('name').and.equal('random2');
      store.getState().currentChannel.should.have.property('id').and.equal('abcde123');  });
  });
  describe('store.dispatch(submitMeessageAction()', function() {
    it('should create a new channel in workspace', function() {
      store.dispatch(submitMessageAction("abcde123", "hi"));
      store.getState().currentChannel.should.have.property('messages').to.be.an('array').that.is.not.empty;
      store.getState().currentChannel.should.have.property('messages').to.include.members(["hi"]);
  });
  describe('store.dispatch(deleteWorkspaceAction("updated workspace"))', function() {
    it('should delete workpace', function() {
      store.getState().workspaces.should.be.of.length(3);
      store.dispatch(deleteWorkspaceAction('123456'));
      store.getState().workspaces.should.be.of.length(2);
    });
  });
})
});

