import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { getMachinesSuccess, getMachinesError } from "./action";
import { DELETE_MACHINE, GET_MACHINES } from "./constants";

export function* getMachinesEmitter() {
  const requestURL = "v1/machine/all";
  try {
    const response = yield call(instance, requestURL);
    yield put(getMachinesSuccess(response?.data));
  } catch (err) {
    yield put(getMachinesError(err));
  }
}

export function* deletetMachineEmitter(action) {
  const requestURL = "v1/machine/delete/" + action?.id;
  try {
    const response = yield call(instance.delete, requestURL);
    yield put(getMachinesSuccess(response?.data));
  } catch (err) {
    yield put(getMachinesError(err));
  }
}

export default function* machineHandler() {
  yield takeLatest(GET_MACHINES, getMachinesEmitter);
  yield takeLatest(DELETE_MACHINE, deletetMachineEmitter);
}
