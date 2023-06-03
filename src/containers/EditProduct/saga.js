import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateProductSuccess, updateProductError, getProductSuccess, getProductError, getProductTypesError, getProductTypesSuccess } from "./action";
import { GET_PRODUCT, UPDATE_PRODUCT, EDIT_GET_PRODUCT_TYPES } from "./constants";

export function* getProductEmitter(action) {
  const requestURL = "/v1/produit/" + action?.id;
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getProductSuccess(response?.data));
  } catch (err) {
    yield put(getProductError(err));
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

export function* updateProductEmitter(action) {
  const requestURL = "v1/produit/update";

  var bodyFormData = new FormData();

  for (const property in action?.product) {
    if (property === "image" && !action?.product?.[property]) {
      continue;
    }

    bodyFormData.append(property, action?.product?.[property]);
  }

  const options = {
    headers: { "Content-Type": `multipart/form-data; boundary=${bodyFormData?._boundary ?? ""}` },
  };

  try {
    const response = yield call(
      instance.put,
      requestURL,
      bodyFormData,
      options
    );

    yield put(updateProductSuccess(response?.data));
  } catch (err) {
    yield put(updateProductError(err));
  }
}

export default function* editProductHandler() {
  yield takeLatest(GET_PRODUCT, getProductEmitter);
  yield takeLatest(UPDATE_PRODUCT, updateProductEmitter);
  yield takeLatest(EDIT_GET_PRODUCT_TYPES, getProductTypesEmitter);
}
