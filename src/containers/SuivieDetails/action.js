import { GET_RAV_HISTORY, GET_RAV_HISTORY_SUCCESS, GET_RAV_HISTORY_ERROR } from './constants';

export function getHistory(id) {
  return {
    type: GET_RAV_HISTORY,
    id
  };
}

export function getHistorySuccess(history) {
  return {
    type: GET_RAV_HISTORY_SUCCESS,
    history
  };
}

export function getHistoryError(error) {
  return {
    type: GET_RAV_HISTORY_ERROR,
    error,
  };
}
