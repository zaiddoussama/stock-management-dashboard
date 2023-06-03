import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateRavitailleurSuccess, updateRavitailleurError, getRavitailleurSuccess, getRavitailleurError } from "./action";
import { GET_RAVITAILLEUR, UPDATE_RAVITAILLEUR } from "./constants";

export function* getRavitailleurEmitter(action) {
  const requestURL = "v1/ravitailleur/" + action?.id;

  try {
    const response = yield call(instance.get, requestURL);
    yield put(getRavitailleurSuccess(response?.data));
  } catch (err) {
    yield put(getRavitailleurError(err));
  }
}

export function* updateRavitailleurEmitter(action) {
  const requestURL = "v1/ravitailleur/update";
  try {
    const response = yield call(instance.put, requestURL, action?.ravitailleur);
    yield put(updateRavitailleurSuccess(response?.data));
  } catch (err) {
    yield put(updateRavitailleurError(err));
  }
}

export default function* ravitailleurHandler() {
  yield takeLatest(UPDATE_RAVITAILLEUR, updateRavitailleurEmitter);
  yield takeLatest(GET_RAVITAILLEUR, getRavitailleurEmitter);
}
