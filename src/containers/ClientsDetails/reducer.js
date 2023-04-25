import produce from "immer";
import {
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT,
  UPDATE_CLIENT_ERROR,
  GET_AVAILABLE_MACHINES,
  GET_AVAILABLE_MACHINES_SUCCESS,
  GET_AVAILABLE_MACHINES_ERROR,
  GET_CLIENT,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_ERROR,
} from "./constants";

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  data: {},
  machines: {
    loading: false,
    error: null,
    data: [],
  },
  currentClient: {
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
      case GET_AVAILABLE_MACHINES:
        draft.machines.loading = true;
        draft.machines.success = false;
        draft.machines.error = null;
        draft.machines.data = [];
        break;

      case GET_AVAILABLE_MACHINES_SUCCESS:
        draft.machines.data = action.machines;
        draft.machines.loading = false;
        draft.machines.success = true;
        draft.machines.error = null;
        break;

      case GET_AVAILABLE_MACHINES_ERROR:
        draft.machines.error = action.error;
        draft.machines.success = false;
        draft.machines.loading = false;
        draft.machines.data = [];
        break;

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

      case GET_CLIENT:
        draft.currentClient.loading = true;
        draft.currentClient.success = false;
        draft.currentClient.error = null;
        draft.currentClient.data = {};
        break;

      case GET_CLIENT_SUCCESS:
        draft.currentClient.data = action.currentClient;
        draft.currentClient.loading = false;
        draft.currentClient.success = true;
        draft.currentClient.error = null;
        break;

      case GET_CLIENT_ERROR:
        draft.currentClient.error = action.error;
        draft.currentClient.loading = false;
        draft.currentClient.success = false;
        draft.currentClient.data = {};
        break;
    }
  });

export default reducer;
