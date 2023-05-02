import {
  DELETE_RAVITAILLEUR,
  DELETE_RAVITAILLEUR_SUCCESS,
  DELETE_RAVITAILLEUR_ERROR,
  GET_RAVITAILLEURS,
  GET_RAVITAILLEURS_SUCCESS,
  GET_RAVITAILLEURS_ERROR,
  UPDATE_RAVITAILLEURS
} from './constants';

export function getRavitailleurs() {
  return {
    type: GET_RAVITAILLEURS,
  };
}

export function getRavitailleursSuccess(ravitailleursList) {
  return {
    type: GET_RAVITAILLEURS_SUCCESS,
    ravitailleursList,
  };
}

export function getRavitailleursError(error) {
  return {
    type: GET_RAVITAILLEURS_ERROR,
    error,
  };
}

export function deleteRavitailleur(id) {
  return {
    type: DELETE_RAVITAILLEUR,
    id,
  };
}

export function deleteRavitailleursSuccess(id) {
  return {
    type: DELETE_RAVITAILLEUR_SUCCESS,
    id,
  };
}

export function deleteRavitailleursError(error) {
  return {
    type: DELETE_RAVITAILLEUR_ERROR,
    error,
  };
}

export function updateRavitailleurs(ravitailleurs) {
  return {
    type: UPDATE_RAVITAILLEURS,
    ravitailleurs,
  };
}
