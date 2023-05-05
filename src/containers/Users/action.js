import {
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_USERS
} from './constants';

export function getUsers() {
  return {
    type: GET_USERS,
  };
}

export function getUsersSuccess(usersList) {
  return {
    type: GET_USERS_SUCCESS,
    usersList,
  };
}

export function getUsersError(error) {
  return {
    type: GET_USERS_ERROR,
    error,
  };
}

export function deleteUser(username) {
  return {
    type: DELETE_USER,
    username,
  };
}

export function deleteUsersSuccess(id) {
  return {
    type: DELETE_USER_SUCCESS,
    id,
  };
}

export function deleteUsersError(error) {
  return {
    type: DELETE_USER_ERROR,
    error,
  };
}

export function updateUsers(users) {
  return {
    type: UPDATE_USERS,
    users,
  };
}
