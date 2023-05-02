import {
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "./constants";

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export function updateUserSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user,
  };
}

export function updateUserError(error) {
  return {
    type: UPDATE_USER_ERROR,
    error,
  };
}

