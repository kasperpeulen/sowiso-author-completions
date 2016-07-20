/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import initDomListener from './dom_listener';
import store from './store';

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
      <App />
    </Provider>
    , createContainerAndAppendToDom());

initDomListener();
