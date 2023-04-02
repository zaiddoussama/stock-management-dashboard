import {
  ADD_MACHINE,
  ADD_MACHINE_SUCCESS,
  ADD_MACHINE_ERROR,
} from "./constants";

export function addMachine(machine) {
  return {
    type: ADD_MACHINE,
    machine,
  };
}

export function addMachineSuccess(machine) {
  return {
    type: ADD_MACHINE_SUCCESS,
    machine,
  };
}

export function addMachineError(error) {
  return {
    type: ADD_MACHINE_ERROR,
    error,
  };
}
