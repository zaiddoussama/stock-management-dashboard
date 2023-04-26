import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { addMachineError, addMachineSuccess } from "./action";
import { ADD_MACHINE } from "./constants";

export function* addMachineEmitter(action) {
  const requestURL = "v1/machine/ajout";
  try {
    const response = yield call(instance.post, requestURL, action?.machine);
    yield put(addMachineSuccess(response?.data));
  } catch (err) {
    yield put(addMachineError(err));
  }
}

export default function* machineHandler() {
  yield takeLatest(ADD_MACHINE, addMachineEmitter);
}
