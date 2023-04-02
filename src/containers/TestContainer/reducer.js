import produce from 'immer';
import { LOAD_TODO_SUCCESS, LOAD_TODO, LOAD_TODO_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  data: {},
};

/* eslint-disable default-case, no-param-reassign */
const todoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TODO:
        draft.loading = true;
        draft.error = null;
        draft.data = {};
        break;

      case LOAD_TODO_SUCCESS:
        draft.data = action.todo;
        draft.loading = false;
        draft.error = null;
        break;

      case LOAD_TODO_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default todoReducer;
