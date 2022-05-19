import * as ActionTypes from './ActionTypes';
import * as apiServices from '../api/services';
import Swal from 'sweetalert2';

// ===============STAFFS===============
export const fetchStaffs = () => (dispatch) => {
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
        Swal.fire('Success!', '', 'success');
        dispatch(addStaff(staff));
        dispatch(fetchDepartments());
        dispatch(fetchSalaries());
      }
    })
    .catch((error) => {
      console.log('Post staff', error.message);
      alert('Your staff could not be posted\nError: ' + error.message);
    });
};

export const updateStaff = (staff) => (dispatch) => {
  apiServices
    .update(staff)
    .then((response) => {
      if (response.ok) {
        dispatch(fetchStaffs());
        dispatch(fetchSalaries());
        Swal.fire('Success!', '', 'success');
      }
    })
    .catch((error) => {
      console.log('Update staff', error.message);
      alert('Your staff could not be updated\nError: ' + error.message);
    });
};

export const deleteStaff = (staffId) => (dispatch) => {
  apiServices
    .del(staffId)
    .then((response) => {
      if (response.ok) {
        dispatch(removeStaff(staffId));
        dispatch(fetchDepartments());
        dispatch(fetchSalaries());
        Swal.fire('Success!', '', 'success');
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

// ===============Departments===============
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

export const getStaffsDepa = (id) => (dispatch) => {
  apiServices
    .get('departments/' + id)
    .then((response) => response.json())
    .then((staffs) => {
      dispatch(addStaffsDepa(staffs));
    })
    .catch((error) => dispatch(addStaffsDepaFailed(error.message)));
};

export const addStaffsDepa = (staffs) => ({
  type: ActionTypes.GET_STAFFSDEPA,
  payload: staffs,
});

export const addStaffsDepaFailed = (errmess) => ({
  type: ActionTypes.STAFFSDEPA_FAILED,
  payload: errmess,
});

// ===============STAFFS===============
export const fetchSalaries = () => (dispatch) => {
  apiServices
    .get('staffsSalary')
    .then((response) => response.json())
    .then((staffsSalary) => dispatch(addSalaries(staffsSalary)))
    .catch((error) => dispatch(salariesFailed(error.message)));
};

export const addSalaries = (staffsSalary) => ({
  type: ActionTypes.ADD_SALARIES,
  payload: staffsSalary,
});

export const salariesFailed = (errmess) => ({
  type: ActionTypes.SALARIES_FAILED,
  payload: errmess,
});

// ===============Modal===============
export const toggleModal = () => ({
  type: ActionTypes.TOGGLE_MODAL,
});
