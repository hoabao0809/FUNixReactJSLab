import * as ActionTypes from './ActionTypes';

export const Staffs = (
  state = { isLoading: true, errMess: null, staffs: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };

    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };

    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffs: [],
      };

    case ActionTypes.ADD_STAFF:
      let staff = action.payload;
      return { ...state, staffs: state.staffs.concat(staff) };

    case ActionTypes.REMOVE_STAFF:
      let id = action.payload;
      return {
        ...state,
        staffs: state.staffs.filter((item) => item.id !== id),
      };

    default:
      return state;
  }
};
