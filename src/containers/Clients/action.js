import {
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR
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

export function deleteClientSuccess(clients) {
  return {
    type: DELETE_CLIENT_SUCCESS,
    clients,
  };
}

export function deleteClientError(error) {
  return {
    type: DELETE_CLIENT_ERROR,
    error,
  };
}
