import {
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  GET_AVAILABLE_MACHINES,
  GET_AVAILABLE_MACHINES_SUCCESS,
  GET_AVAILABLE_MACHINES_ERROR,
} from "./constants";

export function addClient(client) {
  return {
    type: ADD_CLIENT,
    client,
  };
}

export function addClientSuccess(client) {
  return {
    type: ADD_CLIENT_SUCCESS,
    client,
  };
}

export function addClientError(error) {
  return {
    type: ADD_CLIENT_ERROR,
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