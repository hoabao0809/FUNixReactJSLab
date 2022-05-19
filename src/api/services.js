import { baseUrl } from '../api/baseUrl';

export const get = (param) => {
  return fetch(baseUrl + param).then(
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
  );
};

export const post = (param, data) => {
  return fetch(baseUrl + param, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(
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
  );
};

export const update = (data) => {
  return fetch(baseUrl + 'staffs', {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    referrerPolicy: 'origin-when-cross-origin',
  }).then(
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
  );
};

export const del = (paramId) => {
  return fetch(baseUrl + 'staffs/' + paramId, {
    method: 'DELETE',
  }).then(
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
  );
};
