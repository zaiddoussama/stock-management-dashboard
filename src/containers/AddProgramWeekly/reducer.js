import produce from 'immer';
import { ADD_PROGRAM_WEEKLY, ADD_PROGRAM_WEEKLY_SUCCESS, ADD_PROGRAM_WEEKLY_ERROR } from './constants';

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
      case ADD_PROGRAM_WEEKLY:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case ADD_PROGRAM_WEEKLY_SUCCESS:
        draft.data = action.programWeekly;
        draft.success = true;
        draft.loading = false;
        draft.error = null;
        break;

      case ADD_PROGRAM_WEEKLY_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default reducer;
