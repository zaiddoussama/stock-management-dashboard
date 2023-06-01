import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateProductTypeSuccess, updateProductTypeError, getProductTypeSuccess, getProductTypeError } from "./action";
import { GET_PRODUCT_TYPE, UPDATE_PRODUCT_TYPE } from "./constants";

export function* getProductTypeEmitter(action) {
  const requestURL = "/v1/typeproduit/" + action?.id;
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getProductTypeSuccess(response?.data));
  } catch (err) {
    yield put(getProductTypeError(err));
  }
}

export function* updateProductTypeEmitter(action) {
  const requestURL = "v1/typeproduit/update";
  try {
    const response = yield call(instance.put, requestURL, action?.productType);
    yield put(updateProductTypeSuccess(response?.data));
  } catch (err) {
    yield put(updateProductTypeError(err));
  }
}

export default function* productTypeHandler() {
  yield takeLatest(GET_PRODUCT_TYPE, getProductTypeEmitter);
  yield takeLatest(UPDATE_PRODUCT_TYPE, updateProductTypeEmitter);
}
