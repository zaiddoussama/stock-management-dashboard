import produce from 'immer';
import { UPDATE_CLIENT_SUCCESS, UPDATE_CLIENT, UPDATE_CLIENT_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  data: {},
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_CLIENT:
        draft.loading = true;
        draft.error = null;
        draft.data = {};
        break;

      case UPDATE_CLIENT_SUCCESS:
        draft.data = action.client;
        draft.loading = false;
        draft.error = null;
        break;

      case UPDATE_CLIENT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default reducer;
