import { LOAD_TODO, LOAD_TODO_SUCCESS, LOAD_TODO_ERROR } from './constants';

export function loadTODO() {
  return {
    type: LOAD_TODO,
  };
}

export function TODOLoaded(todo) {
  return {
    type: LOAD_TODO_SUCCESS,
    todo
  };
}

export function TODOLoadingError(error) {
  return {
    type: LOAD_TODO_ERROR,
    error,
  };
}
