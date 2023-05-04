import produce from 'immer';
import { ADD_PROGRAM_WEEKLY, ADD_PROGRAM_WEEKLY_SUCCESS, ADD_PROGRAM_WEEKLY_ERROR, GET_AVAILABLE_CLIENTS, GET_AVAILABLE_CLIENTS_SUCCESS, GET_AVAILABLE_CLIENTS_ERROR, GET_AVAILABLE_RAVITAILLEURS, GET_AVAILABLE_RAVITAILLEURS_SUCCESS, GET_AVAILABLE_RAVITAILLEURS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  programWeekly: {
    loading: false,
    success: false,
    error: null,
    data: {}
  },
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
  }
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
    }
  });

export default reducer;
