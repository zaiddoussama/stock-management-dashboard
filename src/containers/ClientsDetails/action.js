import {
  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_ERROR,
} from "./constants";

export function updateClient(client) {
  return {
    type: UPDATE_CLIENT,
    client
  };
}

export function updateClientSuccess(client) {
  return {
    type: UPDATE_CLIENT_SUCCESS,
    client,
  };
}

export function updateClientError(error) {
  return {
    type: UPDATE_CLIENT_ERROR,
    error,
  };
}

