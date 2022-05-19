import * as ActionTypes from './ActionTypes';

export const StaffsDepa = (
  state = {
    isLoading: false,
    errMess: null,
    staffsDepa: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_STAFFSDEPA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffsDepa: action.payload,
      };

    default:
      return state;
  }
};
