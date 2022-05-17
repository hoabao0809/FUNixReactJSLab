import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Staffs } from './staffs';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
