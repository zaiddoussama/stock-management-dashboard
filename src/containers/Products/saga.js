import { call, put, takeLatest } from "redux-saga/effects";

import instance from "../../app/request";
import { getProductsSuccess, getProductsError, deleteProductSuccess, deleteProductError } from "./action";
import { DELETE_PRODUCT, GET_PRODUCTS } from "./constants";

export function* getProductsEmitter() {
  const requestURL = "v1/stock/allproducts";
  try {
    const response = yield call(instance, requestURL);
    yield put(getProductsSuccess(response?.data));
  } catch (err) {
    yield put(getProductsError(err));
  }
}

export function* deletetProductEmitter(action) {
  const requestURL = "v1/produit/delete?idProduit=" + action?.id;
  try {
    const response = yield call(instance.delete, requestURL);
    yield put(deleteProductSuccess(response?.data));
  } catch (err) {
    yield put(deleteProductError(err));
  }
}

export default function* productHandler() {
  yield takeLatest(GET_PRODUCTS, getProductsEmitter);
  yield takeLatest(DELETE_PRODUCT, deletetProductEmitter);
}
