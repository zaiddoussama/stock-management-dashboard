import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "./../../app/request";
import { addProgramWeeklyError, addProgramWeeklySuccess } from './action';
import { PROGRAM_WEEKLY_TYPE } from './constants';


export function* addProgramWeeklyEmitter(action) {
  const requestURL = "v1/programme/ajout";

  try {
    const response = yield call(instance.post, requestURL, action?.programWeekly);
    yield put(addProgramWeeklySuccess(response?.data));
  } catch (err) {
    yield put(addProgramWeeklyError(err));
  }
}

export default function* programWeeklyHandler() {
  yield takeLatest(PROGRAM_WEEKLY_TYPE, addProgramWeeklyEmitter);
}
