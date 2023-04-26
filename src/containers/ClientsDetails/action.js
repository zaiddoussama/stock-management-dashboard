import {
  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_ERROR,
  GET_AVAILABLE_MACHINES,
  GET_AVAILABLE_MACHINES_SUCCESS,
  GET_AVAILABLE_MACHINES_ERROR,
  GET_CLIENT_ERROR,
  GET_CLIENT,
  GET_CLIENT_SUCCESS,
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


export function getAvailableMachines() {
  return {
    type: GET_AVAILABLE_MACHINES,
  };
}

export function getAvailableMachinesSuccess(machines) {
  return {
    type: GET_AVAILABLE_MACHINES_SUCCESS,
    machines
  };
}

export function getAvailableMachinesError(error) {
  return {
    type: GET_AVAILABLE_MACHINES_ERROR,
    error,
  };
}

export function getClient(id) {
  return {
    type: GET_CLIENT,
    id
  };
}

export function getClientSuccess(currentClient) {
  return {
    type: GET_CLIENT_SUCCESS,
    currentClient,
  };
}

export function getClientError(error) {
  return {
    type: GET_CLIENT_ERROR,
    error,
  };
}
