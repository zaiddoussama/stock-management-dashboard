import {
  ADD_RAVITAILLEUR,
  ADD_RAVITAILLEUR_SUCCESS,
  ADD_RAVITAILLEUR_ERROR
} from './constants';

export function addRavitailleur(ravitailleur) {
  return {
    type: ADD_RAVITAILLEUR,
    ravitailleur,
  };
}

export function addRavitailleurSuccess(ravitailleur) {
  return {
    type: ADD_RAVITAILLEUR_SUCCESS,
    ravitailleur,
  };
}

export function addRavitailleurError(ravitailleur) {
  return {
    type: ADD_RAVITAILLEUR_ERROR,
    ravitailleur,
  };
}
