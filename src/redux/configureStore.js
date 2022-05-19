import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Staffs } from './staffs';
import { Departments } from './departments';
import { ModalForm } from './modal';
import { StaffsDepa } from './staffsDepa';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      isModalOpen: ModalForm,
      staffsDepa: StaffsDepa,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
