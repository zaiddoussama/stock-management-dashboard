import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateMachineSuccess, updateMachineError, getMachinesSuccess, getMachinesError } from "./action";
import { EDIT_GET_MACHINES, UPDATE_MACHINE } from "./constants";

export function* getMachinesEmitter() {
  const requestURL = "v1/machine/all";
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getMachinesSuccess(response?.data));
  } catch (err) {
    yield put(getMachinesError(err));
  }
}

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
  yield takeLatest(EDIT_GET_MACHINES, getMachinesEmitter)
}
