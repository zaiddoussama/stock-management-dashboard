import {
  GET_PROGRAMME_LIST,
  GET_PROGRAMME_LIST_SUCCESS,
  GET_PROGRAMME_LIST_ERROR,
} from "./constants";

export function getProgrammeList(id) {
  return {
    type: GET_PROGRAMME_LIST,
    id
  };
}

export function getProgrammeListSuccess(programmes) {
  return {
    type: GET_PROGRAMME_LIST_SUCCESS,
    programmes,
  };
}

export function getProgrammeListError(error) {
  return {
    type: GET_PROGRAMME_LIST_ERROR,
    error,
  };
}