import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import { updateProgramWeeklyError, updateProgramWeeklySuccess, getAvailableClientsError, getAvailableClientsSuccess, getAvailableRavitailleursError, getAvailableRavitailleursSuccess, getProgramWeeklySuccess, getProgramWeeklyError } from './action';
import { UPDATE_PROGRAM_WEEKLY, GET_AVAILABLE_CLIENTS, GET_AVAILABLE_RAVITAILLEURS, GET_PROGRAM_WEEKLY } from './constants';

export function* updateProgramWeeklyEmitter(action) {
  const requestURL = "v1/programme/update";

  try {
    const response = yield call(instance.put, requestURL, action?.programWeekly);
    yield put(updateProgramWeeklySuccess(response?.data));
  } catch (err) {
    yield put(updateProgramWeeklyError(err));
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

export function* getCurrentProgramWeeklyEmitter(action) {
  const requestURL = "v1/programme/" + action?.id;
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getProgramWeeklySuccess(response?.data));
  } catch (err) {
    yield put(getProgramWeeklyError(err));
  }
}

export default function* handler() {
  yield takeLatest(UPDATE_PROGRAM_WEEKLY, updateProgramWeeklyEmitter);
  yield takeLatest(GET_AVAILABLE_CLIENTS, getAvailableClientsEmitter);
  yield takeLatest(GET_AVAILABLE_RAVITAILLEURS, getAvailableRavitailleursEmitter);
  yield takeLatest(GET_PROGRAM_WEEKLY, getCurrentProgramWeeklyEmitter);
}
