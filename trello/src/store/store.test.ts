import chai from 'chai';
import store from '.';
import {addBoardAction, editBoardAction, moveCardAction, moveListAction} from './TrelloApp/actions';
import {ListData} from './TrelloApp/types';
chai.should();
describe('Trello Application store', function() {
  describe('store.dispatch(addBoardAction(""))', function() {
    it('should add a bboard ', function() {
      const oldBoards = store.getState().boards || {}
      oldBoards.should.be.of.length(5);
      store.dispatch(addBoardAction({
        id:"12345",
        name:"new board",
        lists: []
    }));
    const newBoards = store.getState().boards || {};
    newBoards.should.not.be.empty;
    newBoards.should.be.of.length(6);
    });
  });

  describe('store.dispatch(editBoardAction(""))', function() {
    it('should edit board name', function() {
      store.dispatch(editBoardAction("updated Board", "5bdaeff0bee9dc6b70afed0d"));
      const selectedBoard =  store.getState().selectedBoard || {};
      selectedBoard.should.have.property('name').and.equal('updated Board');
    });
  });

  describe('store.dispatch(moveListAction(""))', function() {
    it('move the list item', function() {
      store.dispatch(moveListAction("123456", 1));
      const selectedBoard = store.getState().selectedBoard || {lists:[]};
        const lists:ListData[] = selectedBoard.lists;
        const currentList = lists.filter(l => l.id === '123456')[0];
        currentList.should.have.property('index').and.equal(2);
    });
  });

  describe('store.dispatch(moveCardAction(""))', function() {
    it('move the list item', function() {
      store.dispatch(moveCardAction('123456', "123", 1));
      const selectedBoard = store.getState().selectedBoard || {lists:[]};
      const lists: ListData[] = selectedBoard.lists;
      const testList:ListData = lists.filter(l => l.id === '123456')[0];
      const testCard = testList.cards.filter(c => c.id === '123')[0];
      testCard.should.have.property('index').and.equal(2);
    });
  });


});

