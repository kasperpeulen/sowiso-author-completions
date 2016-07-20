/* @flow */
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from 'redux-diff-logger';

export default applyMiddleware(logger)(createStore)(reducers);
