import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import { addProductTypeError, addProductTypeSuccess } from './action';
import { ADD_PRODUCT_TYPE } from './constants';


export function* addProductTypeEmitter(action) {
  const requestURL = "v1/typeproduit/ajout";

  try {
    const response = yield call(instance.post, requestURL, action?.productType);
    yield put(addProductTypeSuccess(response?.data));
  } catch (err) {
    yield put(addProductTypeError(err));
  }
}


export default function* productTypeHandler() {
  yield takeLatest(ADD_PRODUCT_TYPE, addProductTypeEmitter);
}
