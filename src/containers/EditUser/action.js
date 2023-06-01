import {
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "./constants";

export function getUser(id) {
  return {
    type: GET_USER,
    id,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}

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

