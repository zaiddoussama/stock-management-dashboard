import { call, put, takeLatest } from 'redux-saga/effects';

import instance from "../../app/request";
import { getRavListSuccess, getRavListError } from './action';
import { GET_RAV_LIST } from './constants';


export function* getRavList() {
  const requestURL = "/v1/ravitailleur/all";

  try {
    const ravList = yield call(instance, requestURL);
    yield put(getRavListSuccess(ravList?.data));
  } catch (err) {
    yield put(getRavListError(err));
  }
}


export default function* ravListData() {
  yield takeLatest(GET_RAV_LIST, getRavList);
}
