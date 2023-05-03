import produce from 'immer';
import { GET_RAV_HISTORY, GET_RAV_HISTORY_SUCCESS, GET_RAV_HISTORY_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  data: [],
};

/* eslint-disable default-case, no-param-reassign */
const historyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_RAV_HISTORY:
        draft.loading = true;
        draft.error = null;
        draft.data = [];
        break;

      case GET_RAV_HISTORY_SUCCESS:
        draft.data = action.history;
        draft.loading = false;
        draft.error = null;
        break;

      case GET_RAV_HISTORY_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.data = [];
        break;
    }
  });

export default historyReducer;
