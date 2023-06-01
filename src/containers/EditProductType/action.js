import {
  GET_PRODUCT_TYPE,
  GET_PRODUCT_TYPE_ERROR,
  GET_PRODUCT_TYPE_SUCCESS,
  UPDATE_PRODUCT_TYPE,
  UPDATE_PRODUCT_TYPE_ERROR,
  UPDATE_PRODUCT_TYPE_SUCCESS,
} from "./constants";

export function getProductType(id) {
  console.log(id);
  console.log("**************************MEEEEEEEEEEEEEEEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOooofsdfigsdhkfsbsakdsa");
  return {
    type: GET_PRODUCT_TYPE,
    id,
  };
}

export function getProductTypeSuccess(productType) {
  return {
    type: GET_PRODUCT_TYPE_SUCCESS,
    productType,
  };
}

export function getProductTypeError(error) {
  return {
    type: GET_PRODUCT_TYPE_ERROR,
    error,
  };
}

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

