import produce from 'immer';
import {
  GET_RAVITAILLEURS,
  GET_RAVITAILLEURS_SUCCESS,
  GET_RAVITAILLEURS_ERROR,
  DELETE_RAVITAILLEUR,
  DELETE_RAVITAILLEUR_SUCCESS,
  DELETE_RAVITAILLEUR_ERROR,
  UPDATE_RAVITAILLEURS
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  success: false,
  error: null,
  data: [],
  deleteRavitailleur: {
    loading: false,
    success: false,
    error: null,
    data: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_RAVITAILLEURS:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = [];
        break;

      case GET_RAVITAILLEURS_SUCCESS:
        draft.data = action.ravitailleursList;
        draft.loading = false;
        draft.success = true;
        draft.error = null;
        break;

      case GET_RAVITAILLEURS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.success = false;
        draft.data = [];
        break;

      case UPDATE_RAVITAILLEURS:
        draft.data = action.ravitailleurs;
        break;

      case DELETE_RAVITAILLEUR:
        draft.deleteRavitailleur.loading = true;
        draft.deleteRavitailleur.success = false;
        draft.deleteRavitailleur.error = null;
        draft.deleteRavitailleur.data = {};
        break;

      case DELETE_RAVITAILLEUR_SUCCESS:
        draft.deleteRavitailleur.loading = false;
        draft.deleteRavitailleur.success = true;
        draft.deleteRavitailleur.error = null;
        draft.deleteRavitailleur.data = action.deleteRavitailleur;
        break;

      case DELETE_RAVITAILLEUR_ERROR:
        draft.deleteRavitailleur.loading = false;
        draft.deleteRavitailleur.success = false;
        draft.deleteRavitailleur.error = action.error;
        draft.deleteRavitailleur.data = {};
        break;
    }
  });

export default reducer;
