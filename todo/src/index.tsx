import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import TodoApplicationReducer from './store/TodoApp/reducer'; 
import initialState from './initialState.json';
import './index.css';
import {createStore} from 'redux';
const store = createStore(TodoApplicationReducer, initialState);

store.subscribe( () => {
    const newState = store.getState();
    ReactDOM.render(<Home key={Math.random()} items={store.getState().items} currentItem={store.getState().currentItem}/>, document.getElementById('root'));
  })

ReactDOM.render(<Home key={Math.random()} items={store.getState().items} currentItem={store.getState().currentItem}/>, document.getElementById('root'));

export default store;