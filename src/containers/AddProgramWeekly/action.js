import {
  ADD_PROGRAM_WEEKLY,
  ADD_PROGRAM_WEEKLY_SUCCESS,
  ADD_PROGRAM_WEEKLY_ERROR,
  GET_AVAILABLE_CLIENTS,
  GET_AVAILABLE_CLIENTS_SUCCESS,
  GET_AVAILABLE_CLIENTS_ERROR,
  GET_AVAILABLE_RAVITAILLEURS,
  GET_AVAILABLE_RAVITAILLEURS_SUCCESS,
  GET_AVAILABLE_RAVITAILLEURS_ERROR
} from './constants';

export function addProgramWeekly(programWeekly) {
  return {
    type: ADD_PROGRAM_WEEKLY,
    programWeekly,
  };
}

export function addProgramWeeklySuccess(programWeekly) {
  return {
    type: ADD_PROGRAM_WEEKLY_SUCCESS,
    programWeekly,
  };
}

export function addProgramWeeklyError(programWeekly) {
  return {
    type: ADD_PROGRAM_WEEKLY_ERROR,
    programWeekly,
  };
}

export function getAvailableClients() {
  return {
    type: GET_AVAILABLE_CLIENTS,
  };
}

export function getAvailableClientsSuccess(clients) {
  return {
    type: GET_AVAILABLE_CLIENTS_SUCCESS,
    clients
  };
}

export function getAvailableClientsError(error) {
  return {
    type: GET_AVAILABLE_CLIENTS_ERROR,
    error,
  };
}

export function getAvailableRavitailleurs() {
  return {
    type: GET_AVAILABLE_RAVITAILLEURS,
  };
}

export function getAvailableRavitailleursSuccess(ravitailleurs) {
  return {
    type: GET_AVAILABLE_RAVITAILLEURS_SUCCESS,
    ravitailleurs
  };
}

export function getAvailableRavitailleursError(error) {
  return {
    type: GET_AVAILABLE_RAVITAILLEURS_ERROR,
    error,
  };
}
