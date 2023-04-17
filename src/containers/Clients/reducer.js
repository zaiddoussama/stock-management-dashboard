import produce from 'immer';
import { GET_CLIENTS_SUCCESS, GET_CLIENTS, GET_CLIENTS_ERROR } from './constants';

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
      case GET_CLIENTS:
        draft.loading = true;
        draft.error = null;
        draft.data = [];
        break;

      case GET_CLIENTS_SUCCESS:
        draft.data = action.clients;
        draft.loading = false;
        draft.error = null;
        break;

      case GET_CLIENTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.data = [];
        break;
    }
  });

export default reducer;
