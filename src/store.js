/* @flow */
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from 'redux-diff-logger';
import type {State} from "./reducers/index";
import type {Store} from 'redux';

export const store = applyMiddleware(logger)(createStore)(reducers);
