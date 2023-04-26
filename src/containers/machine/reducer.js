import produce from "immer";
import {
  GET_MACHINES_SUCCESS,
  GET_MACHINES,
  GET_MACHINES_ERROR,
  UPDATE_MACHINES,
  DELETE_MACHINE,
  DELETE_MACHINE_SUCCESS,
  DELETE_MACHINE_ERROR,
} from "./constants";

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  data: [],
  deleteMachine: {
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
      case GET_MACHINES:
        draft.loading = true;
        draft.error = null;
        draft.data = [];
        break;

      case GET_MACHINES_SUCCESS:
        draft.data = action.machinesList;
        draft.loading = false;
        draft.error = null;
        break;

      case UPDATE_MACHINES:
        draft.data = action.machines;
        break;

      case GET_MACHINES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.data = [];
        break;

      case DELETE_MACHINE:
        draft.deleteMachine.loading = true;
        draft.deleteMachine.success = false;
        draft.deleteMachine.error = null;
        draft.deleteMachine.data = {};
        break;

      case DELETE_MACHINE_SUCCESS:
        draft.deleteMachine.loading = false;
        draft.deleteMachine.success = true;
        draft.deleteMachine.error = null;
        draft.deleteMachine.data = action.deleteMachine;
        break;

      case DELETE_MACHINE_ERROR:
        draft.deleteMachine.loading = false;
        draft.deleteMachine.success = false;
        draft.deleteMachine.error = action.error;
        draft.deleteMachine.data = {};
        break;
    }
  });

export default reducer;
