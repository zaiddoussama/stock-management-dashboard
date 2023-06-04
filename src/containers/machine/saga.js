import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { getMachinesSuccess, getMachinesError, deleteMachineSuccess, deleteMachineError } from "./action";
import { DELETE_MACHINE, GET_MACHINES } from "./constants";

export function* getMachinesEmitter() {
  const requestURL = "v1/machine/all";
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getMachinesSuccess(response?.data));
  } catch (err) {
    yield put(getMachinesError(err));
  }
}

export function* deletetMachineEmitter(action) {
  const requestURL = "v1/machine/delete?idMachine=" + action?.id;
  try {
    const response = yield call(instance.delete, requestURL);
    yield put(deleteMachineSuccess(response?.data));
  } catch (err) {
    yield put(deleteMachineError(err));
  }
}

export default function* machineHandler() {
  yield takeLatest(GET_MACHINES, getMachinesEmitter);
  yield takeLatest(DELETE_MACHINE, deletetMachineEmitter);
}
