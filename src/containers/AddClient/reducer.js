import produce from "immer";

import {
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT,
  ADD_CLIENT_ERROR,
  GET_AVAILABLE_MACHINES,
  GET_AVAILABLE_MACHINES_SUCCESS,
  GET_AVAILABLE_MACHINES_ERROR,
} from "./constants";

// The initial state of the App
export const initialState = {
  client: {
    loading: false,
    success: false,
    error: null,
    data: {},
  },
  machines: {
    loading: false,
    success: false,
    error: null,
    data: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_CLIENT:
        draft.client.loading = true;
        draft.client.success = false;
        draft.client.error = null;
        draft.client.data = {};
        break;

      case ADD_CLIENT_SUCCESS:
        draft.client.data = action.client;
        draft.client.loading = false;
        draft.client.success = true;
        draft.client.error = null;
        break;

      case ADD_CLIENT_ERROR:
        draft.client.error = action.error;
        draft.client.success = false;
        draft.client.loading = false;
        draft.client.data = {};
        break;

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
    }
  });

export default reducer;
