import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateRavitailleurSuccess, updateRavitailleurError } from "./action";
import { UPDATE_RAVITAILLEUR } from "./constants";

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
}
