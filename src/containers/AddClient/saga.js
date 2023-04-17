import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { addClientError, addClientSuccess, getAvailableMachinesError, getAvailableMachinesSuccess } from "./action";
import { ADD_CLIENT, GET_AVAILABLE_MACHINES } from "./constants";

export function* addClientEmitter(action) {
  const requestURL = "v1/client/ajout";
  try {
    const response = yield call(instance.post, requestURL, action?.client);
    yield put(addClientSuccess(response?.data));
  } catch (err) {
    yield put(addClientError(err));
  }
}

export function* getAvailableMachinesEmitter() {
  const requestURL = "v1/machine/allWithNoClient";
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getAvailableMachinesSuccess(response?.data));
  } catch (err) {
    yield put(getAvailableMachinesError(err));
  }
}

export default function* machineHandler() {
  yield takeLatest(ADD_CLIENT, addClientEmitter);
  yield takeLatest(GET_AVAILABLE_MACHINES, getAvailableMachinesEmitter);
}
