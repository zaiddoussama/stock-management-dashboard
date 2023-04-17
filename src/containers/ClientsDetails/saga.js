import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateMachineSuccess, updateMachineError } from "./action";
import { UPDATE_CLIENT } from "./constants";

export function* updateMachineEmitter(action) {
  const requestURL = "/todos/1";
  try {
    const response = yield call(instance.post, requestURL, action?.client);
    yield put(updateMachineSuccess(response?.data));
  } catch (err) {
    yield put(updateMachineError(err));
  }
}

export default function* machineHandler() {
  yield takeLatest(UPDATE_CLIENT, updateMachineEmitter);
}
