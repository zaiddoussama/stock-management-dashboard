import {
  GET_PRODUCT,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_SUCCESS,
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

