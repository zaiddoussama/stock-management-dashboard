import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import {
  updateClientSuccess,
  updateClientError,
  getAvailableMachinesSuccess,
  getAvailableMachinesError,
  getClientSuccess,
  getClientError,
} from "./action";
import { GET_AVAILABLE_MACHINES, GET_CLIENT, UPDATE_CLIENT } from "./constants";

export function* updateMachineEmitter(action) {
  const requestURL = "v1/client/update";
  var bodyFormData = new FormData();
  for (const property in action?.client) {
    if (property === "machines") {
      bodyFormData.append(
        "machinesJson",
        JSON.stringify(action?.client?.[property])
      );
    } else {
      bodyFormData.append(property, action?.client?.[property]);
    }
  }
  const options = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  try {
    const response = yield call(
      instance.post,
      requestURL,
      bodyFormData,
      options
    );
    yield put(updateClientSuccess(response?.data));
  } catch (err) {
    yield put(updateClientError(err));
  }
}

export function* getAvailableMachinesEmitter() {
  const requestURL = "v1/machine/all";
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getAvailableMachinesSuccess(response?.data));
  } catch (err) {
    yield put(getAvailableMachinesError(err));
  }
}

export function* getCurrentClientEmitter(action) {
  const requestURL = "v1/client/" + action?.id;
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getClientSuccess(response?.data));
  } catch (err) {
    yield put(getClientError(err));
  }
}

export default function* machineHandler() {
  yield takeLatest(UPDATE_CLIENT, updateMachineEmitter);
  yield takeLatest(GET_CLIENT, getCurrentClientEmitter);
  yield takeLatest(GET_AVAILABLE_MACHINES, getAvailableMachinesEmitter);
}
