/*
 * Blue1984 - Twitter without censorship
 * Copyright (c) 2020. Mikhail Lazarev
 * https://github.com/MikaelLazarev/blue1984-server
 *
 */

import {applyMiddleware, compose, createStore} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { apiMiddleware } from "redux-api-middleware";

let composeEnhancers : typeof compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  composeEnhancers = composeWithDevTools({});
} else {
  composeEnhancers = compose;
}

export type RootState = ReturnType<typeof reducer>;

export default function configureStore() {
  return createStore(
    reducer,
      composeEnhancers(applyMiddleware(thunk, apiMiddleware )),
  );
}
