/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

const store = applyMiddleware()(createStore)(reducers);

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
