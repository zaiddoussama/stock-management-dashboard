import {
  UPDATE_MACHINE,
  UPDATE_MACHINE_SUCCESS,
  UPDATE_MACHINE_ERROR,
} from "./constants";

export function updateMachine(machine) {
  return {
    type: UPDATE_MACHINE,
    machine
  };
}

export function updateMachineSuccess(machine) {
  return {
    type: UPDATE_MACHINE_SUCCESS,
    machine,
  };
}

export function updateMachineError(error) {
  return {
    type: UPDATE_MACHINE_ERROR,
    error,
  };
}

