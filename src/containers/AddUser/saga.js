import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import { addUserError, addUserSuccess } from './action';
import { ADD_USER } from './constants';


export function* addUserEmitter(action) {
  const requestURL = "v1/fournisseur/ajout";

  try {
    const response = yield call(instance.post, requestURL, action?.user);
    yield put(addUserSuccess(response?.data));
  } catch (err) {
    yield put(addUserError(err));
  }
}


export default function* userHandler() {
  yield takeLatest(ADD_USER, addUserEmitter);
}
