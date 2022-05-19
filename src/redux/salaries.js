import * as ActionTypes from './ActionTypes';

export const Salaries = (
  state = { isLoading: true, errMess: null, staffsSalary: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SALARIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffsSalary: action.payload,
      };

    case ActionTypes.SALARIES_LOADING:
      return { ...state, isLoading: true, errMess: null, staffsSalary: [] };

    case ActionTypes.SALARIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffsSalary: [],
      };

    default:
      return state;
  }
};
