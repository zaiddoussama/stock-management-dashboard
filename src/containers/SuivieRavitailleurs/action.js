import {
  GET_RAV_LIST,
  GET_RAV_LIST_SUCCESS,
  GET_RAV_LIST_ERROR,
} from "./constants";

export function getRavList() {
  return {
    type: GET_RAV_LIST,
  };
}

export function getRavListSuccess(ravitailleurs) {
  return {
    type: GET_RAV_LIST_SUCCESS,
    ravitailleurs,
  };
}

export function getRavListError(error) {
  return {
    type: GET_RAV_LIST_ERROR,
    error,
  };
}