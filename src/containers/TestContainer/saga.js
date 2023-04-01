 import { call, put, takeLatest } from 'redux-saga/effects';
 
 import instance from "./../../app/request";
import { TODOLoaded, TODOLoadingError } from './action';
import { LOAD_TODO } from './constants';
 

 export function* getTODO() {
   const requestURL = "/todos/1";
 
   try {
     const TODO = yield call(instance, requestURL);
     yield put(TODOLoaded(TODO?.data));
   } catch (err) {
     yield put(TODOLoadingError(err));
   }
 }
 

 export default function* todoData() {
   yield takeLatest(LOAD_TODO, getTODO);
 }
 