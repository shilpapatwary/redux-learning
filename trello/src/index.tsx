import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import initialState from './initialState.json';
import TrelloApplicationReducer from './store/TrelloApp/reducer';
import {createStore} from 'redux';
const store = createStore(TrelloApplicationReducer, initialState);


store.subscribe( () => {
    const newState = store.getState();
    ReactDOM.render(<Home key={Math.random()*12345} boards={newState.boards} selectedBoard={newState.selectedBoard} showBoards={newState.showBoards} showLists={newState.showLists}/>, document.getElementById('root'));
  })
ReactDOM.render(<Home key={Math.random()*12345}  boards={store.getState().boards} selectedBoard={store.getState().selectedBoard} showBoards={store.getState().showBoards} showLists={store.getState().showLists}/>, document.getElementById('root'));

export default store;