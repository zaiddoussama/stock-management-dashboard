import {
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  FILTER_CLIENTS
} from "./constants";

export function getClients() {
  return {
    type: GET_CLIENTS,
  };
}

export function getClientsSuccess(clients) {
  return {
    type: GET_CLIENTS_SUCCESS,
    clients,
  };
}

export function filterClients(clients) {
  return {
    type: FILTER_CLIENTS,
    clients,
  };
}

export function getClientsError(error) {
  return {
    type: GET_CLIENTS_ERROR,
    error,
  };
}

export function deleteClient(id) {
  return {
    type: DELETE_CLIENT,
    id
  };
}

export function deleteClientSuccess(baseResponse) {
  return {
    type: DELETE_CLIENT_SUCCESS,
    baseResponse,
  };
}

export function deleteClientError(error) {
  return {
    type: DELETE_CLIENT_ERROR,
    error,
  };
}
