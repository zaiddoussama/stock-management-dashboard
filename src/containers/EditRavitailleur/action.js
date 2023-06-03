import {
  GET_RAVITAILLEUR,
  GET_RAVITAILLEUR_ERROR,
  GET_RAVITAILLEUR_SUCCESS,
  UPDATE_RAVITAILLEUR,
  UPDATE_RAVITAILLEUR_ERROR,
  UPDATE_RAVITAILLEUR_SUCCESS,
} from "./constants";

export function getRavitailleur(id) {
  return {
    type: GET_RAVITAILLEUR,
    id,
  };
}

export function getRavitailleurSuccess(ravitailleur) {
  return {
    type: GET_RAVITAILLEUR_SUCCESS,
    ravitailleur,
  };
}

export function getRavitailleurError(error) {
  return {
    type: GET_RAVITAILLEUR_ERROR,
    error,
  };
}

export function updateRavitailleur(ravitailleur) {
  return {
    type: UPDATE_RAVITAILLEUR,
    ravitailleur,
  };
}

export function updateRavitailleurSuccess(ravitailleur) {
  return {
    type: UPDATE_RAVITAILLEUR_SUCCESS,
    ravitailleur,
  };
}

export function updateRavitailleurError(error) {
  return {
    type: UPDATE_RAVITAILLEUR_ERROR,
    error,
  };
}

