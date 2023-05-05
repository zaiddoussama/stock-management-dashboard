import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "../../app/request";
import { getHistorySuccess, getHistoryError } from './action';
import { GET_RAV_HISTORY } from './constants';


export function* getHistory(action) {
  const requestURL = "/v1/programme/traceability?idProgramme=" + action?.id;

  try {
    const history = yield call(instance, requestURL);
    yield put(getHistorySuccess(history?.data));
  } catch (err) {
    yield put(getHistoryError(err));
  }
}


export default function* historyData() {
  yield takeLatest(GET_RAV_HISTORY, getHistory);
}
