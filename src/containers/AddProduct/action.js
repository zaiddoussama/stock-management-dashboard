import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  ADD_GET_PRODUCT_TYPES,
  ADD_GET_PRODUCT_TYPES_ERROR,
  ADD_GET_PRODUCT_TYPES_SUCCESS,
} from "./constants";

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function addProductSuccess(product) {
  return {
    type: ADD_PRODUCT_SUCCESS,
    product,
  };
}

export function addProductError(error) {
  return {
    type: ADD_PRODUCT_ERROR,
    error,
  };
}


export function getProductTypes() {
  return {
    type: ADD_GET_PRODUCT_TYPES,
  };
}

export function getProductTypesSuccess(productTypes) {
  return {
    type: ADD_GET_PRODUCT_TYPES_SUCCESS,
    productTypes,
  };
}

export function getProductTypesError(error) {
  return {
    type: ADD_GET_PRODUCT_TYPES_ERROR,
    error,
  };
}