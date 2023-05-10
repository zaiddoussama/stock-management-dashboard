import produce from 'immer';
import { UPDATE_PROGRAM_WEEKLY, UPDATE_PROGRAM_WEEKLY_SUCCESS, UPDATE_PROGRAM_WEEKLY_ERROR, GET_AVAILABLE_PROGRAM_WEEKLYS, GET_AVAILABLE_PROGRAM_WEEKLYS_SUCCESS, GET_AVAILABLE_PROGRAM_WEEKLYS_ERROR, GET_AVAILABLE_RAVITAILLEURS, GET_AVAILABLE_RAVITAILLEURS_SUCCESS, GET_AVAILABLE_RAVITAILLEURS_ERROR, GET_PROGRAM_WEEKLY, GET_PROGRAM_WEEKLY_SUCCESS, GET_PROGRAM_WEEKLY_ERROR, GET_AVAILABLE_CLIENTS, GET_AVAILABLE_CLIENTS_SUCCESS, GET_AVAILABLE_CLIENTS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  data: {},
  clients: {
    loading: false,
    success: false,
    error: null,
    data: [],
  },
  ravitailleurs: {
    loading: false,
    success: false,
    error: null,
    data: [],
  },
  currentProgramWeekly: {
    loading: false,
    success: false,
    error: null,
    data: {},
  }
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_PROGRAM_WEEKLY:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case UPDATE_PROGRAM_WEEKLY_SUCCESS:
        draft.data = action.programWeekly;
        draft.success = true;
        draft.loading = false;
        draft.error = null;
        break;

      case UPDATE_PROGRAM_WEEKLY_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;

      case GET_AVAILABLE_CLIENTS:
        draft.clients.loading = true;
        draft.clients.success = false;
        draft.clients.error = null;
        draft.clients.data = [];
        break;

      case GET_AVAILABLE_CLIENTS_SUCCESS:
        draft.clients.data = action.clients;
        draft.clients.loading = false;
        draft.clients.success = true;
        draft.clients.error = null;
        break;

      case GET_AVAILABLE_CLIENTS_ERROR:
        draft.clients.error = action.error;
        draft.clients.success = false;
        draft.clients.loading = false;
        draft.clients.data = [];
        break;

      case GET_AVAILABLE_RAVITAILLEURS:
        draft.ravitailleurs.loading = true;
        draft.ravitailleurs.success = false;
        draft.ravitailleurs.error = null;
        draft.ravitailleurs.data = [];
        break;

      case GET_AVAILABLE_RAVITAILLEURS_SUCCESS:
        draft.ravitailleurs.data = action.ravitailleurs;
        draft.ravitailleurs.loading = false;
        draft.ravitailleurs.success = true;
        draft.ravitailleurs.error = null;
        break;

      case GET_AVAILABLE_RAVITAILLEURS_ERROR:
        draft.ravitailleurs.error = action.error;
        draft.ravitailleurs.success = false;
        draft.ravitailleurs.loading = false;
        draft.ravitailleurs.data = [];
        break;

        case GET_PROGRAM_WEEKLY:
          draft.currentProgramWeekly.loading = true;
          draft.currentProgramWeekly.success = false;
          draft.currentProgramWeekly.error = null;
          draft.currentProgramWeekly.data = {};
          break;
  
        case GET_PROGRAM_WEEKLY_SUCCESS:
          draft.currentProgramWeekly.data = action.currentProgramWeekly;
          draft.currentProgramWeekly.loading = false;
          draft.currentProgramWeekly.success = true;
          draft.currentProgramWeekly.error = null;
          break;
  
        case GET_PROGRAM_WEEKLY_ERROR:
          draft.currentProgramWeekly.error = action.error;
          draft.currentProgramWeekly.loading = false;
          draft.currentProgramWeekly.success = false;
          draft.currentProgramWeekly.data = {};
          break;
    }
  });

export default reducer;
