import produce from 'immer';
import { UPDATE_RAVITAILLEUR_SUCCESS, UPDATE_RAVITAILLEUR, UPDATE_RAVITAILLEUR_ERROR, GET_RAVITAILLEUR, GET_RAVITAILLEUR_SUCCESS, GET_RAVITAILLEUR_ERROR } from './constants';

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
      case GET_RAVITAILLEUR:
        draft.loading = false;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case GET_RAVITAILLEUR_SUCCESS:
        draft.loading = false;
        draft.success = true;
        draft.error = null;
        draft.data = action.ravitailleur;
        break;

      case GET_RAVITAILLEUR_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;

      case UPDATE_RAVITAILLEUR:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case UPDATE_RAVITAILLEUR_SUCCESS:
        draft.data = action.ravitailleur;
        draft.success = true;
        draft.loading = false;
        draft.error = null;
        break;

      case UPDATE_RAVITAILLEUR_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default reducer;
