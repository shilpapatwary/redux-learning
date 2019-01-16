import chai from 'chai';
import store from '.';
import {}
chai.should();
describe('Trello Application store', function() {
  describe('store.dispatch(editWorkspaceAction("updated workspace"))', function() {
    it('should update workpace name', function() {
      store.dispatch(editWorkspaceAction('123456','updated workspace'));
      store.getState().currentWorkspace.should.have.property('name').and.equal('updated workspace');
    });
  });
});

