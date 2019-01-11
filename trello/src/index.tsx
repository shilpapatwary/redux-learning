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
    ReactDOM.render(<Home boards={store.getState().boards} selectedBoard={store.getState().selectedBoard}/>, document.getElementById('root'));
  })
ReactDOM.render(<Home boards={store.getState().boards} selectedBoard={store.getState().selectedBoard}/>, document.getElementById('root'));

export default store;