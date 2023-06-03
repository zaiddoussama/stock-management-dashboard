import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  FILTER_PRODUCTS
} from "./constants";

export function getProducts() {
  return {
    type: GET_PRODUCTS,
  };
}

export function getProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products,
  };
}

export function filterProducts(products) {
  return {
    type: FILTER_PRODUCTS,
    products,
  };
}

export function getProductsError(error) {
  return {
    type: GET_PRODUCTS_ERROR,
    error,
  };
}

export function deleteProduct(id) {
  return {
    type: DELETE_PRODUCT,
    id
  };
}

export function deleteProductSuccess(baseResponse) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    baseResponse,
  };
}

export function deleteProductError(error) {
  return {
    type: DELETE_PRODUCT_ERROR,
    error,
  };
}
