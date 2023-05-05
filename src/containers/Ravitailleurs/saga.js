import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import {
  deleteRavitailleursError,
  deleteRavitailleursSuccess,
  getRavitailleursError,
  getRavitailleursSuccess
} from './action';
import { DELETE_RAVITAILLEUR, GET_RAVITAILLEURS } from './constants';


export function* getRavitailleursEmitter() {
  const requestURL = "v1/ravitailleur/all";

  try {
    const response = yield call(instance, requestURL);
    yield put(getRavitailleursSuccess(response?.data));
  } catch (err) {
    yield put(getRavitailleursError(err));
  }
}

export function* deleteRavitailleurEmitter(action) {
  const requestURL = "v1/ravitailleur/delete?username=" + action?.username;

  try {
    const response = yield call(instance.delete, requestURL);
    yield put(deleteRavitailleursSuccess(response?.data));
  } catch (err) {
    yield put(deleteRavitailleursError(err));
  }
}

export default function* ravitailleurHandler() {
  yield takeLatest(GET_RAVITAILLEURS, getRavitailleursEmitter);
  yield takeLatest(DELETE_RAVITAILLEUR, deleteRavitailleurEmitter);
}
