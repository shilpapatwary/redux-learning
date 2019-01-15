import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';

import initialState from './initialState.json';
import SlackApplicationReducer from './store/SlackApp/reducer';
import {createStore} from 'redux';

export const store = createStore(SlackApplicationReducer, initialState);
store.subscribe( () => {
    ReactDOM.render(<Home key={Math.random()*12345} workspaces={store.getState().workspaces} currentWorkspace={store.getState().currentWorkspace} showChannels={store.getState().showChannels} showWorkspaces={store.getState().showWorkspaces} channelsList={store.getState().channelsList} currentChannel={store.getState().currentChannel} />, document.getElementById('root'));
    
});
ReactDOM.render(<Home key={Math.random()*12345} workspaces={store.getState().workspaces} currentWorkspace={store.getState().currentWorkspace} showChannels={store.getState().showChannels} showWorkspaces={store.getState().showWorkspaces} channelsList={store.getState().channelsList} currentChannel={store.getState().currentChannel} />, document.getElementById('root'));

export default store;