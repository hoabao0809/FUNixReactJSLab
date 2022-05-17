import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../api/baseUrl';

export const fetchStaffs = () => (dispatch) => {
  // dispatch(staffLoading())

  return fetch(baseUrl + 'staffs')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

// Departments
export const fetchDepartments = () => (dispatch) => {
  return fetch(baseUrl + 'departments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((departments) => {
      dispatch(addDeparts(departments));
    })
    .catch((error) => dispatch(departsFailed(error.message)));
};

export const addDeparts = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const departsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});
