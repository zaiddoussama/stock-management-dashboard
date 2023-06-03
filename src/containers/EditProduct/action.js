import {
  GET_PRODUCT,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_SUCCESS,
  EDIT_GET_PRODUCT_TYPES,
  EDIT_GET_PRODUCT_TYPES_ERROR,
  EDIT_GET_PRODUCT_TYPES_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
} from "./constants";

export function getProduct(id) {
  console.log(id);
  console.log("HHHHHHHHHHHHHHJJJJJJJJJJJJJJJJJJJJJJJJJJJJ");
  return {
    type: GET_PRODUCT,
    id,
  };
}

export function getProductSuccess(product) {
  return {
    type: GET_PRODUCT_SUCCESS,
    product,
  };
}

export function getProductError(error) {
  return {
    type: GET_PRODUCT_ERROR,
    error,
  };
}

export function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
}

export function updateProductSuccess(product) {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    product,
  };
}

export function updateProductError(error) {
  return {
    type: UPDATE_PRODUCT_ERROR,
    error,
  };
}

export function getProductTypes() {
  return {
    type: EDIT_GET_PRODUCT_TYPES,
  };
}

export function getProductTypesSuccess(productTypes) {
  return {
    type: EDIT_GET_PRODUCT_TYPES_SUCCESS,
    productTypes,
  };
}

export function getProductTypesError(error) {
  return {
    type: EDIT_GET_PRODUCT_TYPES_ERROR,
    error,
  };
}

