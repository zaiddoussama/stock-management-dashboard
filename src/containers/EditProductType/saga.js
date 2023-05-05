import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateProductTypeSuccess, updateProductTypeError } from "./action";
import { UPDATE_PRODUCT_TYPE } from "./constants";

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
  yield takeLatest(UPDATE_PRODUCT_TYPE, updateProductTypeEmitter);
}
