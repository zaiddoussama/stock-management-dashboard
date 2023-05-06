import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { getProgramWeekliesSuccess, getProgramWeekliesError, deleteProgramWeeklySuccess, deleteProgramWeeklyError } from "./action";
import { DELETE_PROGRAM_WEEKLY, GET_PROGRAM_WEEKLIES } from "./constants";

export function* getProgramWeekliesEmitter() {
  const requestURL = "v1/programme/all";
  try {
    const response = yield call(instance, requestURL);
    yield put(getProgramWeekliesSuccess(response?.data));
  } catch (err) {
    yield put(getProgramWeekliesError(err));
  }
}

export function* deletetProgramWeeklyEmitter(action) {
  const requestURL = "v1/programme/delete?idProgrammeWeekly=" + action?.id;
  try {
    const response = yield call(instance.delete, requestURL);
    yield put(deleteProgramWeeklySuccess(response?.data));
  } catch (err) {
    yield put(deleteProgramWeeklyError(err));
  }
}

export default function* clientHandler() {
  yield takeLatest(GET_PROGRAM_WEEKLIES, getProgramWeekliesEmitter);
  yield takeLatest(DELETE_PROGRAM_WEEKLY, deletetProgramWeeklyEmitter);
}
