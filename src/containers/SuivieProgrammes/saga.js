import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "../../app/request";
import { getProgrammeListSuccess, getProgrammeListError } from './action';
import { GET_PROGRAMME_LIST } from './constants';


export function* getProgrammeList(action) {
  const requestURL = "/v1/programme/allByRavitailleur?idRavitailleur=" + action?.id;

  try {
    const programList = yield call(instance, requestURL);
    yield put(getProgrammeListSuccess(programList?.data));
  } catch (err) {
    yield put(getProgrammeListError(err));
  }
}


export default function* programmeListData() {
  yield takeLatest(GET_PROGRAMME_LIST, getProgrammeList);
}
