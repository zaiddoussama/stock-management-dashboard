import { call, put, takeLatest } from "redux-saga/effects";

import instance from "./../../app/request";
import { updateProductSuccess, updateProductError, getProductSuccess, getProductError } from "./action";
import { GET_PRODUCT, UPDATE_PRODUCT } from "./constants";

export function* getProductEmitter(action) {
  if (!action?.id) {
    console.log(action);
    return;
  }

  const requestURL = "/v1/produit/" + action?.id;
  try {
    const response = yield call(instance.get, requestURL);
    yield put(getProductSuccess(response?.data));
  } catch (err) {
    yield put(getProductError(err));
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

  console.log(bodyFormData);
  console.log("****************************************HHHSHSHSSHSSHSSSMOAD");

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

    // const response = yield call(instance.put, requestURL, action?.product);
    yield put(updateProductSuccess(response?.data));
  } catch (err) {
    yield put(updateProductError(err));
  }
}

export default function* editProductHandler() {
  yield takeLatest(GET_PRODUCT, getProductEmitter);
  yield takeLatest(UPDATE_PRODUCT, updateProductEmitter);
}
