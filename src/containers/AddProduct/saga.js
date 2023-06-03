import { call, put, takeLatest } from "redux-saga/effects";

import instance from "../../app/request";
import {
  addProductError,
  addProductSuccess,
  getProductTypesError,
  getProductTypesSuccess,
} from "./action";
import { ADD_GET_PRODUCT_TYPES, ADD_PRODUCT } from "./constants";

export function* addProductEmitter(action) {
  const requestURL = "v1/produit/ajout";
  var bodyFormData = new FormData();

  for (const property in action?.product) {
    if (property === "image" && !action?.product?.[property]) {
      continue;
    }

    bodyFormData.append(property, action?.product?.[property]);
  }

  const options = {
    headers: { "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}` },
  };

  try {
    const response = yield call(
      instance.post,
      requestURL,
      bodyFormData,
      options
    );

    yield put(addProductSuccess(response?.data));
  } catch (err) {
    yield put(addProductError(err));
  }
}

export function* getProductTypesEmitter() {

  const requestURL = "v1/typeproduit/all";

  try {
    const response = yield call(instance.get, requestURL);
    yield put(getProductTypesSuccess(response?.data));
  } catch (err) {
    yield put(getProductTypesError(err));
  }
}

export default function* addProducthandler() {
  yield takeLatest(ADD_PRODUCT, addProductEmitter);
  yield takeLatest(ADD_GET_PRODUCT_TYPES, getProductTypesEmitter)
}
