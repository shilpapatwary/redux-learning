import chai from 'chai';
import store from '.';
import {addBoardAction, editBoardAction, moveCardAction, moveListAction} from './TrelloApp/actions';
chai.should();
describe('Trello Application store', function() {
  describe('store.dispatch(addBoardAction(""))', function() {
    it('should add a bboard ', function() {
      store.getState().boards.should.be.of.length(5);
      store.dispatch(addBoardAction({
        id:"12345",
        name:"new board",
        lists: []
    }));
    store.getState().boards.should.not.be.empty;
    store.getState().boards.should.be.of.length(6);
    });
    it('should edit board ', function() {
      store.dispatch(editBoardAction("5bdaeff0bee9dc6b70afed0d","updated name"));
    store.getState().selectedBoard.should.have.property('name').and.equal('updated name');
    });
  });
});

