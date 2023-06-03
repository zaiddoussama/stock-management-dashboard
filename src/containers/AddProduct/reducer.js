import produce from "immer";

import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
} from "./constants";

// The initial state of the App
export const initialState = {
    loading: false,
    success: false,
    error: null,
    data: {},
  
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_PRODUCT:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case ADD_PRODUCT_SUCCESS:
        draft.data = action.product;
        draft.loading = false;
        draft.success = true;
        draft.error = null;
        break;

      case ADD_PRODUCT_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default reducer;
