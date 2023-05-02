import produce from 'immer';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  UPDATE_USERS
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  success: false,
  error: null,
  data: [],
  deleteUser: {
    loading: false,
    success: false,
    error: null,
    data: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = [];
        break;

      case GET_USERS_SUCCESS:
        draft.data = action.usersList;
        draft.loading = false;
        draft.success = true;
        draft.error = null;
        break;

      case GET_USERS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.success = false;
        draft.data = [];
        break;

      case UPDATE_USERS:
        draft.data = action.users;
        break;

      case DELETE_USER:
        draft.deleteUser.loading = true;
        draft.deleteUser.success = false;
        draft.deleteUser.error = null;
        draft.deleteUser.data = {};
        break;

      case DELETE_USER_SUCCESS:
        draft.deleteUser.loading = false;
        draft.deleteUser.success = true;
        draft.deleteUser.error = null;
        draft.deleteUser.data = action.deleteUser;
        break;

      case DELETE_USER_ERROR:
        draft.deleteUser.loading = false;
        draft.deleteUser.success = false;
        draft.deleteUser.error = action.error;
        draft.deleteUser.data = {};
        break;
    }
  });

export default reducer;
