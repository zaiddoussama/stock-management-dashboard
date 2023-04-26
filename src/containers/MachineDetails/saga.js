import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateMachineSuccess, updateMachineError } from "./action";
import { UPDATE_MACHINE } from "./constants";

export function* updateMachineEmitter(action) {
  const requestURL = "v1/machine/update";
  try {
    const response = yield call(instance.put, requestURL, action?.machine);
    yield put(updateMachineSuccess(response?.data));
  } catch (err) {
    yield put(updateMachineError(err));
  }
}

export default function* machineHandler() {
  yield takeLatest(UPDATE_MACHINE, updateMachineEmitter);
}
