import {
  UPDATE_MACHINE,
  UPDATE_MACHINE_SUCCESS,
  UPDATE_MACHINE_ERROR,
} from "./constants";

export function updateMachine(payload) {
  return {
    type: UPDATE_MACHINE,
    payload
  };
}

export function updateMachineSuccess(payload) {
  return {
    type: UPDATE_MACHINE_SUCCESS,
    payload,
  };
}

export function updateMachineError(error) {
  return {
    type: UPDATE_MACHINE_ERROR,
    error,
  };
}

