import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { getClientsSuccess, getClientsError, deleteClientSuccess, deleteClientError } from "./action";
import { DELETE_CLIENT, GET_CLIENTS } from "./constants";

export function* getClientsEmitter() {
  const requestURL = "v1/client/all";
  try {
    const response = yield call(instance, requestURL);
    yield put(getClientsSuccess(response?.data));
  } catch (err) {
    yield put(getClientsError(err));
  }
}

export function* deletetClientEmitter(action) {
  const requestURL = "v1/client/delete/" + action?.id;
  try {
    const response = yield call(instance.post, requestURL);
    yield put(deleteClientSuccess(response?.data));
  } catch (err) {
    yield put(deleteClientError(err));
  }
}

export default function* clientHandler() {
  yield takeLatest(GET_CLIENTS, getClientsEmitter);
  yield takeLatest(DELETE_CLIENT, deletetClientEmitter);
}
