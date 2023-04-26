import produce from "immer";
import {
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS,
  GET_CLIENTS_ERROR,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  FILTER_CLIENTS,
} from "./constants";

// The initial state of the App
export const initialState = {
  clients: {
    loading: false,
    error: null,
    data: [],
  },
  deleteClientBaseResponse: {
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
      case GET_CLIENTS:
        draft.clients.loading = true;
        draft.clients.error = null;
        draft.clients.data = [];
        break;

      case GET_CLIENTS_SUCCESS:
        draft.clients.data = action.clients;
        draft.clients.loading = false;
        draft.clients.error = null;
        break;

      case GET_CLIENTS_ERROR:
        draft.clients.error = action.error;
        draft.clients.loading = false;
        draft.clients.data = [];
        break;

      case FILTER_CLIENTS:
        draft.clients.data = action.clients;
        draft.clients.loading = false;
        draft.clients.error = null;
        break;

      case DELETE_CLIENT:
        draft.deleteClientBaseResponse.loading = true;
        draft.deleteClientBaseResponse.success = false;
        draft.deleteClientBaseResponse.error = null;
        draft.deleteClientBaseResponse.data = {};
        break;

      case DELETE_CLIENT_SUCCESS:
        draft.deleteClientBaseResponse.data = action.baseResponse;
        draft.deleteClientBaseResponse.loading = false;
        draft.deleteClientBaseResponse.success = true;
        draft.deleteClientBaseResponse.error = null;
        break;

      case DELETE_CLIENT_ERROR:
        draft.deleteClientBaseResponse.error = action.error;
        draft.deleteClientBaseResponse.loading = false;
        draft.deleteClientBaseResponse.success = false;
        draft.deleteClientBaseResponse.data = {};
        break;
    }
  });

export default reducer;
