import produce from "immer";
import {
  GET_PROGRAM_WEEKLIES_SUCCESS,
  GET_PROGRAM_WEEKLIES,
  GET_PROGRAM_WEEKLIES_ERROR,
  DELETE_PROGRAM_WEEKLY,
  DELETE_PROGRAM_WEEKLY_SUCCESS,
  DELETE_PROGRAM_WEEKLY_ERROR,
  FILTER_PROGRAM_WEEKLIES,
} from "./constants";

// The initial state of the App
export const initialState = {
  programWeeklies: {
    loading: false,
    success: false,
    error: null,
    data: [],
  },
  deleteProgramWeekly: {
    loading: false,
    success: false,
    error: null,
    data: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_PROGRAM_WEEKLIES:
        draft.programWeeklies.loading = true;
        draft.programWeeklies.error = null;
        draft.programWeeklies.data = [];
        draft.programWeeklies.success = false;
        break;

      case GET_PROGRAM_WEEKLIES_SUCCESS:
        draft.programWeeklies.data = action.programWeeklies;
        draft.programWeeklies.loading = false;
        draft.programWeeklies.error = null;
        draft.programWeeklies.success = true;
        break;

      case GET_PROGRAM_WEEKLIES_ERROR:
        draft.programWeeklies.error = action.error;
        draft.programWeeklies.loading = false;
        draft.programWeeklies.success = false;
        draft.programWeeklies.data = [];
        break;

      case FILTER_PROGRAM_WEEKLIES:
        draft.programWeeklies.data = action.programWeeklies;
        draft.programWeeklies.loading = false;
        draft.programWeeklies.error = null;
        break;

      case DELETE_PROGRAM_WEEKLY:
        draft.deleteProgramWeekly.loading = true;
        draft.deleteProgramWeekly.success = false;
        draft.deleteProgramWeekly.error = null;
        draft.deleteProgramWeekly.data = {};
        break;

      case DELETE_PROGRAM_WEEKLY_SUCCESS:
        draft.deleteProgramWeekly.loading = false;
        draft.deleteProgramWeekly.success = true;
        draft.deleteProgramWeekly.error = null;
        draft.deleteProgramWeekly.data = action.deleteProgramWeekly;
        break;

      case DELETE_PROGRAM_WEEKLY_ERROR:
        draft.deleteProgramWeekly.error = action.error;
        draft.deleteProgramWeekly.loading = false;
        draft.deleteProgramWeekly.success = false;
        draft.deleteProgramWeekly.data = {};
        break;
    }
  });

export default reducer;
