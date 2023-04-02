import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { getMachinesSuccess, getMachinesError } from "./action";
import { GET_MACHINES } from "./constants";

export function* getMachinesEmitter(action) {
  const requestURL = "/todos/1";
  try {
    const response = yield call(instance, requestURL);
    yield put(getMachinesSuccess(response?.data));
  } catch (err) {
    yield put(getMachinesError(err));
  }
}

export default function* machineHandler() {
  yield takeLatest(GET_MACHINES, getMachinesEmitter);
}
