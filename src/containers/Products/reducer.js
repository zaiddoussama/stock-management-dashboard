import produce from "immer";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  FILTER_PRODUCTS,
} from "./constants";

// The initial state of the App
export const initialState = {
  products: {
    loading: false,
    success: false,
    error: null,
    data: [],
  },
  deleteProductBaseResponse: {
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
      case GET_PRODUCTS:
        draft.products.loading = true;
        draft.products.success = false;
        draft.products.error = null;
        draft.products.data = [];
        break;

      case GET_PRODUCTS_SUCCESS:
        draft.products.data = action.products;
        draft.products.loading = false;
        draft.products.success = true;
        draft.products.error = null;
        break;

      case GET_PRODUCTS_ERROR:
        draft.products.error = action.error;
        draft.products.loading = false;
        draft.products.success = false;
        draft.products.data = [];
        break;

      case FILTER_PRODUCTS:
        draft.products.data = action.products;
        draft.products.loading = false;
        draft.products.error = null;
        break;

      case DELETE_PRODUCT:
        draft.deleteProductBaseResponse.loading = true;
        draft.deleteProductBaseResponse.success = false;
        draft.deleteProductBaseResponse.error = null;
        draft.deleteProductBaseResponse.data = {};
        break;

      case DELETE_PRODUCT_SUCCESS:
        draft.deleteProductBaseResponse.data = action.baseResponse;
        draft.deleteProductBaseResponse.loading = false;
        draft.deleteProductBaseResponse.success = true;
        draft.deleteProductBaseResponse.error = null;
        break;

      case DELETE_PRODUCT_ERROR:
        draft.deleteProductBaseResponse.error = action.error;
        draft.deleteProductBaseResponse.loading = false;
        draft.deleteProductBaseResponse.success = false;
        draft.deleteProductBaseResponse.data = {};
        break;
    }
  });

export default reducer;
