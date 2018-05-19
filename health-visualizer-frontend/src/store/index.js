import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import promiseMiddleware from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, {}, applyMiddleware(
  ReduxThunk,
  promiseMiddleware(),
));

export default store;
