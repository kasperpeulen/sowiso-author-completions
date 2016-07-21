/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/app';
import initDomListener from './dom_listener';
import {store} from './store';
import {fetchInitialState} from "./fetch_initial_state";

// fetch the completions data from json
fetchInitialState();

// The whole extension will live in a div appended to body
// with an `extension-container` class.
const createContainerAndAppendToDom = (): HTMLDivElement => {
  const extensionContainer = document.createElement('div');
  extensionContainer.className = 'extension-container';
  document.body.appendChild(extensionContainer);
  return extensionContainer;
};

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , createContainerAndAppendToDom());

// listens to dom events such as keydowm
initDomListener();
