import {
  ADD_PRODUCT_TYPE,
  ADD_PRODUCT_TYPE_SUCCESS,
  ADD_PRODUCT_TYPE_ERROR
} from './constants';

export function addProductType(productType) {
  return {
    type: ADD_PRODUCT_TYPE,
    productType,
  };
}

export function addProductTypeSuccess(productType) {
  return {
    type: ADD_PRODUCT_TYPE_SUCCESS,
    productType,
  };
}

export function addProductTypeError(productType) {
  return {
    type: ADD_PRODUCT_TYPE_ERROR,
    productType,
  };
}
