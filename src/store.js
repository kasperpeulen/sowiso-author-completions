/* @flow */
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from 'redux-diff-logger';

export const store = applyMiddleware(logger)(createStore)(reducers, window.devToolsExtension && window.devToolsExtension());
