import {
  UPDATE_RAVITAILLEUR,
  UPDATE_RAVITAILLEUR_ERROR,
  UPDATE_RAVITAILLEUR_SUCCESS,
} from "./constants";

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

