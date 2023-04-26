import produce from 'immer';
import { UPDATE_MACHINE_SUCCESS, UPDATE_MACHINE, UPDATE_MACHINE_ERROR } from './constants';

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
      case UPDATE_MACHINE:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case UPDATE_MACHINE_SUCCESS:
        draft.data = action.machine;
        draft.success = true;
        draft.loading = false;
        draft.error = null;
        break;

      case UPDATE_MACHINE_ERROR:
        draft.error = action.error;
        draft.success  = false;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default reducer;
