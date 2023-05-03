import {
  UPDATE_PRODUCT_TYPE,
   UPDATE_PRODUCT_TYPE_ERROR,
    UPDATE_PRODUCT_TYPE_SUCCESS,
} from "./constants";

export function updateProductType(productType) {
  return {
    type: UPDATE_PRODUCT_TYPE,
    productType,
  };
}

export function updateProductTypeSuccess(productType) {
  return {
    type: UPDATE_PRODUCT_TYPE_SUCCESS,
    productType,
  };
}

export function updateProductTypeError(error) {
  return {
    type: UPDATE_PRODUCT_TYPE_ERROR,
    error,
  };
}

