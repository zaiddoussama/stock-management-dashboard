import {
  DELETE_PRODUCT_TYPE,
  DELETE_PRODUCT_TYPE_SUCCESS,
  DELETE_PRODUCT_TYPE_ERROR,
  GET_PRODUCT_TYPES,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR
} from './constants';

export function getProductTypes() {
  return {
    type: GET_PRODUCT_TYPES,
  };
}

export function getProductTypesSuccess(productTypesList) {
  return {
    type: GET_PRODUCT_TYPES_SUCCESS,
    productTypesList,
  };
}

export function getProductTypesError(error) {
  return {
    type: GET_PRODUCT_TYPES_ERROR,
    error,
  };
}

export function deleteProductTypes(id) {
  return {
    type: DELETE_PRODUCT_TYPE,
    id
  };
}

export function deleteProductTypesSuccess(productTypessList) {
  return {
    type: DELETE_PRODUCT_TYPE_SUCCESS,
    productTypessList,
  };
}

export function deleteProductTypesError(error) {
  return {
    type: DELETE_PRODUCT_TYPE_ERROR,
    error,
  };
}
