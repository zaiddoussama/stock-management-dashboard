import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import {
  addClientError,
  addClientSuccess,
  getAvailableMachinesError,
  getAvailableMachinesSuccess,
} from "./action";
import { ADD_CLIENT, GET_AVAILABLE_MACHINES } from "./constants";

export function* addClientEmitter(action) {
  const requestURL = "v1/client/ajout";
  var bodyFormData = new FormData();
  for (const property in action?.client) {
    if (property === "machines") {
      bodyFormData.append(
        "machines",
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

export default function* handler() {
  yield takeLatest(ADD_CLIENT, addClientEmitter);
  yield takeLatest(GET_AVAILABLE_MACHINES, getAvailableMachinesEmitter);
}
