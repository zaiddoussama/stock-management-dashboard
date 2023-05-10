import {
  UPDATE_PROGRAM_WEEKLY,
  UPDATE_PROGRAM_WEEKLY_SUCCESS,
  UPDATE_PROGRAM_WEEKLY_ERROR,
  GET_AVAILABLE_CLIENTS,
  GET_AVAILABLE_CLIENTS_SUCCESS,
  GET_AVAILABLE_CLIENTS_ERROR,
  GET_AVAILABLE_RAVITAILLEURS,
  GET_AVAILABLE_RAVITAILLEURS_SUCCESS,
  GET_AVAILABLE_RAVITAILLEURS_ERROR,
  GET_PROGRAM_WEEKLY,
  GET_PROGRAM_WEEKLY_SUCCESS,
  GET_PROGRAM_WEEKLY_ERROR
} from './constants';

export function updateProgramWeekly(programWeekly) {
  return {
    type: UPDATE_PROGRAM_WEEKLY,
    programWeekly,
  };
}

export function updateProgramWeeklySuccess(programWeekly) {
  return {
    type: UPDATE_PROGRAM_WEEKLY_SUCCESS,
    programWeekly,
  };
}

export function updateProgramWeeklyError(programWeekly) {
  return {
    type: UPDATE_PROGRAM_WEEKLY_ERROR,
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

export function getProgramWeekly(id) {
  return {
    type: GET_PROGRAM_WEEKLY,
    id
  };
}

export function getProgramWeeklySuccess(currentProgramWeekly) {
  return {
    type: GET_PROGRAM_WEEKLY_SUCCESS,
    currentProgramWeekly,
  };
}

export function getProgramWeeklyError(error) {
  return {
    type: GET_PROGRAM_WEEKLY_ERROR,
    error,
  };
}