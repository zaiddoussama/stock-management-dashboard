import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import {
  deleteProductTypesError,
  deleteProductTypesSuccess,
  getProductTypesError,
  getProductTypesSuccess
} from './action';
import { DELETE_PRODUCT_TYPE, GET_PRODUCT_TYPES, LOAD_TODO } from './constants';


export function* getProductTypesEmitter() {
  const requestURL = "v1/typeproduit/all";

  try {
    const response = yield call(instance, requestURL);
    yield put(getProductTypesSuccess(response?.data));
  } catch (err) {
    yield put(getProductTypesError(err));
  }
}

export function* deleteProductTypeEmitter(action) {
  const requestURL = "v1/typeproduit/delete?idTypeProduit=" + action?.id;

  try {
    const response = yield call(instance, requestURL);
    yield put(deleteProductTypesSuccess(response?.data));
  } catch (err) {
    yield put(deleteProductTypesError(err));
  }
}

export default function* productTypeHandler() {
  yield takeLatest(GET_PRODUCT_TYPES, getProductTypesEmitter);
  yield takeLatest(DELETE_PRODUCT_TYPE, deleteProductTypeEmitter);
}
