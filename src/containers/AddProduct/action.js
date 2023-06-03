import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
} from "./constants";

export function addProduct(product) {
  console.log(product);
  console.log("HHHHHHHHHHHHHHKKKKKKKKKKKKKKKKKKK");
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
