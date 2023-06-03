import produce from 'immer';
import { UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_ERROR, GET_PRODUCT, GET_PRODUCT_SUCCESS, GET_PRODUCT_ERROR, EDIT_GET_PRODUCT_TYPES, EDIT_GET_PRODUCT_TYPES_SUCCESS, EDIT_GET_PRODUCT_TYPES_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  success: false,
  error: null,
  data: {},
  productTypes: {
    loading: false,
    success: false,
    error: null,
    data: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PRODUCT:
        draft.loading = false;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case GET_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.success = true;
        draft.error = null;
        draft.data = action.product;
        break;

      case GET_PRODUCT_ERROR:
        draft.loading = false;
        draft.success = false;
        draft.error = action.error;
        draft.data = {};
        break;

      case EDIT_GET_PRODUCT_TYPES:
        draft.productTypes.loading = false;
        draft.productTypes.success = false;
        draft.productTypes.error = null;
        draft.productTypes.data = [];
        break;

      case EDIT_GET_PRODUCT_TYPES_SUCCESS:
        draft.productTypes.loading = false;
        draft.productTypes.success = true;
        draft.productTypes.error = null;
        draft.productTypes.data = action.productTypes;
        break;

      case EDIT_GET_PRODUCT_TYPES_ERROR:
        draft.productTypes.loading = false;
        draft.productTypes.success = false;
        draft.productTypes.error = action.error;
        draft.productTypes.data = [];
        break;

      case UPDATE_PRODUCT:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = {};
        break;

      case UPDATE_PRODUCT_SUCCESS:
        draft.data = action.product;
        draft.success = true;
        draft.loading = false;
        draft.error = null;
        break;

      case UPDATE_PRODUCT_ERROR:
        draft.error = action.error;
        draft.success = false;
        draft.loading = false;
        draft.data = {};
        break;
    }
  });

export default reducer;
