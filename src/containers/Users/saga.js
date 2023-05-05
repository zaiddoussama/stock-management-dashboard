import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import {
  deleteUsersError,
  deleteUsersSuccess,
  getUsersError,
  getUsersSuccess
} from './action';
import { DELETE_USER, GET_USERS } from './constants';


export function* getUsersEmitter() {
  const requestURL = "v1/fournisseur/all";

  try {
    const response = yield call(instance, requestURL);
    yield put(getUsersSuccess(response?.data));
  } catch (err) {
    yield put(getUsersError(err));
  }
}

export function* deleteUserEmitter(action) {
  const requestURL = "v1/fournisseur/delete?username=" + action?.username;

  try {
    const response = yield call(instance.delete, requestURL);
    yield put(deleteUsersSuccess(response?.data));
  } catch (err) {
    yield put(deleteUsersError(err));
  }
}

export default function* userHandler() {
  yield takeLatest(GET_USERS, getUsersEmitter);
  yield takeLatest(DELETE_USER, deleteUserEmitter);
}
