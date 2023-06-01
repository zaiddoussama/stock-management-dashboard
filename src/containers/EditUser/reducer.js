import produce from 'immer';
import { UPDATE_USER_SUCCESS, UPDATE_USER, UPDATE_USER_ERROR, GET_USER, GET_USER_SUCCESS, GET_USER_ERROR } from './constants';

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
      case GET_USER:
        draft.loading = false;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case GET_USER_SUCCESS:
        draft.loading = false;
        draft.success = true;
        draft.error = null;
        draft.data = action.user;
        break;

      case GET_USER_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;

      case UPDATE_USER:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case UPDATE_USER_SUCCESS:
        draft.data = action.user;
        draft.success = true;
        draft.loading = false;
        draft.error = null;
        break;

      case UPDATE_USER_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default reducer;
