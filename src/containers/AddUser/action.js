import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR
} from './constants';

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function addUserSuccess(user) {
  return {
    type: ADD_USER_SUCCESS,
    user,
  };
}

export function addUserError(user) {
  return {
    type: ADD_USER_ERROR,
    user,
  };
}
