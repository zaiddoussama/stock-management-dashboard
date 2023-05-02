import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import { addRavitailleurError, addRavitailleurSuccess } from './action';
import { ADD_RAVITAILLEUR } from './constants';


export function* addRavitailleurEmitter(action) {
  const requestURL = "v1/ravitailleur/ajout";

  try {
    const response = yield call(instance.post, requestURL, action?.ravitailleur);
    yield put(addRavitailleurSuccess(response?.data));
  } catch (err) {
    yield put(addRavitailleurError(err));
  }
}

export default function* ravitailleurHandler() {
  yield takeLatest(ADD_RAVITAILLEUR, addRavitailleurEmitter);
}
