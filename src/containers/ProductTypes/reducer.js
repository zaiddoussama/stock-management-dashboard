import produce from 'immer';
import { LOAD_TODO_SUCCESS, LOAD_TODO, LOAD_TODO_ERROR, GET_PRODUCT_TYPES, GET_PRODUCT_TYPES_SUCCESS, GET_PRODUCT_TYPES_ERROR, DELETE_PRODUCT_TYPE, DELETE_PRODUCT_TYPE_SUCCESS, DELETE_PRODUCT_TYPE_ERROR, UPDATE_PRODUCT_TYPES } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  success: false,
  error: null,
  data: [],
  deleteProductType: {
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
      case GET_PRODUCT_TYPES:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        draft.data = [];
        break;

      case GET_PRODUCT_TYPES_SUCCESS:
        draft.data = action.productTypesList;
        draft.loading = false;
        draft.success = true;
        draft.error = null;
        break;

      case GET_PRODUCT_TYPES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.success = false;
        draft.data = [];
        break;

        case UPDATE_PRODUCT_TYPES:
        draft.data = action.productTypes;
        break;

      case DELETE_PRODUCT_TYPE:
        draft.deleteProductType.loading = true;
        draft.deleteProductType.success = false;
        draft.deleteProductType.error = null;
        draft.deleteProductType.data = {};
        break;

      case DELETE_PRODUCT_TYPE_SUCCESS:
        draft.deleteProductType.loading = false;
        draft.deleteProductType.success = true;
        draft.deleteProductType.error = null;
        draft.deleteProductType.data = action.deleteProductType;
        break;

      case DELETE_PRODUCT_TYPE_ERROR:
        draft.deleteProductType.loading = false;
        draft.deleteProductType.success = false;
        draft.deleteProductType.error = action.error;
        draft.deleteProductType.data = {};
        break;
    }
  });

export default reducer;
