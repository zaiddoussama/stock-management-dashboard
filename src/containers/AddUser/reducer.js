import produce from 'immer';
import { ADD_USER, ADD_USER_SUCCESS, ADD_USER_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  success: false,
  error: null,
  data: {},
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_USER:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case ADD_USER_SUCCESS:
        draft.data = action.todo;
        draft.success = true;
        draft.loading = false;
        draft.error = null;
        break;

      case ADD_USER_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default reducer;
