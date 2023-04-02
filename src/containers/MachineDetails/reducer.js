import produce from 'immer';
import { GET_MACHINES_SUCCESS, GET_MACHINES, GET_MACHINES_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  data: [],
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MACHINES:
        draft.loading = true;
        draft.error = null;
        draft.data = [];
        break;

      case GET_MACHINES_SUCCESS:
        draft.data = action.todo;
        draft.loading = false;
        draft.error = null;
        break;

      case GET_MACHINES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.data = [];
        break;
    }
  });

export default reducer;
