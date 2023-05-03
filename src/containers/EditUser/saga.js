import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateUserSuccess, updateUserError } from "./action";
import { UPDATE_USER } from "./constants";

export function* updateUserEmitter(action) {
  const requestURL = "v1/fournisseur/update";
  try {
    const response = yield call(instance.put, requestURL, action?.user);
    yield put(updateUserSuccess(response?.data));
  } catch (err) {
    yield put(updateUserError(err));
  }
}

export default function* userHandler() {
  yield takeLatest(UPDATE_USER, updateUserEmitter);
}
