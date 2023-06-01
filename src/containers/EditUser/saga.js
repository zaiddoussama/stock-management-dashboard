import { call, put, takeLatest } from "redux-saga/effects";
import { getUsersError } from "../Users/action";

import instance from "./../../app/request";
import { updateUserSuccess, updateUserError, getUser, getUserSuccess, getUserError } from "./action";
import { GET_USER, UPDATE_USER } from "./constants";

export function* getUserEmitter(action) {
  const requestURL = "v1/fournisseur/" + action?.id;

  try {
    const response = yield call(instance.get, requestURL);
    yield put(getUserSuccess(response?.data));
  } catch (err) {
    yield put(getUserError(err));
  }
}

export function* updateUserEmitter(action) {
  const requestURL = "v1/fournisseur/update";
  try {
    const response = yield call(instance.put, requestURL, action?.user);
    yield put(updateUserSuccess(response?.data));
  } catch (err) {
    yield put(updateUserError(err));
  }
}

export default function* userHandler() {
  yield takeLatest(UPDATE_USER, updateUserEmitter);
  yield takeLatest(GET_USER, getUserEmitter);
}
