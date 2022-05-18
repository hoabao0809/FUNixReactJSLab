import * as ActionTypes from './ActionTypes';
import * as apiServices from '../api/services';

export const fetchStaffs = () => (dispatch) => {
  // dispatch(staffLoading())

  apiServices
    .get('staffs')
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

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postStaff = (staff) => (dispatch) => {
  apiServices
    .post('staffs', staff)
    .then((response) => {
      if (response.ok) {
        dispatch(addStaff(staff));
        console.log(response.statusText);
      }
    })
    .catch((error) => {
      console.log('Post staff', error.message);
      alert('Your staff could not be posted\nError: ' + error.message);
    });
};

export const deleteStaff = (staffId) => (dispatch) => {
  apiServices
    .del(staffId)
    .then((response) => {
      if (response.ok) {
        dispatch(removeStaff(staffId));
        // window.history.replaceState('', '', '/staff');
        // window.location = '/#'; // Redirect to Staff Page after deleting staff
      }
    })
    .catch((error) => {
      console.log('Delete staff', error.message);
      alert('Your staff could not be deleted\nError: ' + error.message);
    });
};

export const removeStaff = (staffId) => ({
  type: ActionTypes.REMOVE_STAFF,
  payload: staffId,
});

// Departments
export const fetchDepartments = () => (dispatch) => {
  apiServices
    .get('departments')
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
