import produce from 'immer';
import { GET_PROGRAMME_LIST, GET_PROGRAMME_LIST_SUCCESS, GET_PROGRAMME_LIST_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  data: [],
};

/* eslint-disable default-case, no-param-reassign */
const ravListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROGRAMME_LIST:
        draft.loading = true;
        draft.error = null;
        draft.data = [];
        break;

      case GET_PROGRAMME_LIST_SUCCESS:
        draft.data = action.programmes;
        draft.loading = false;
        draft.error = null;
        break;

      case GET_PROGRAMME_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.data = [];
        break;
    }
  });

export default ravListReducer;
