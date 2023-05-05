import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import { addProgramWeeklyError, addProgramWeeklySuccess, getAvailableClientsError, getAvailableClientsSuccess, getAvailableRavitailleursError, getAvailableRavitailleursSuccess } from './action';
import { ADD_PROGRAM_WEEKLY, GET_AVAILABLE_CLIENTS, GET_AVAILABLE_RAVITAILLEURS } from './constants';

export function* addProgramWeeklyEmitter(action) {
  const requestURL = "v1/programme/ajout";

  try {
    const response = yield call(instance.post, requestURL, action?.programWeekly);
    yield put(addProgramWeeklySuccess(response?.data));
  } catch (err) {
    yield put(addProgramWeeklyError(err));
  }
}

export function* getAvailableRavitailleursEmitter() {
  const requestURL = "v1/ravitailleur/all";
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getAvailableRavitailleursSuccess(response?.data));
  } catch (err) {
    yield put(getAvailableRavitailleursError(err));
  }
}

export function* getAvailableClientsEmitter() {
  const requestURL = "v1/client/all";
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getAvailableClientsSuccess(response?.data));
  } catch (err) {
    yield put(getAvailableClientsError(err));
  }
}

export default function* handler() {
  yield takeLatest(ADD_PROGRAM_WEEKLY, addProgramWeeklyEmitter);
  yield takeLatest(GET_AVAILABLE_CLIENTS, getAvailableClientsEmitter);
  yield takeLatest(GET_AVAILABLE_RAVITAILLEURS, getAvailableRavitailleursEmitter);
}
