import { call, put, takeLatest } from "redux-saga/effects";

import instance from "../../app/request";
import {
  addProductError,
  addProductSuccess,
} from "./action";
import { ADD_PRODUCT } from "./constants";

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

export default function* addProducthandler() {
  yield takeLatest(ADD_PRODUCT, addProductEmitter);
}
