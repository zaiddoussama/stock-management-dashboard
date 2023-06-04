import {
  UPDATE_MACHINE,
  UPDATE_MACHINE_SUCCESS,
  UPDATE_MACHINE_ERROR,
  EDIT_GET_MACHINES,
  EDIT_GET_MACHINES_SUCCESS,
  EDIT_GET_MACHINES_ERROR,
} from "./constants";

export function updateMachine(machine) {
  return {
    type: UPDATE_MACHINE,
    machine,
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


export function getMachines() {
  return {
    type: EDIT_GET_MACHINES,
  };
}

export function getMachinesSuccess(machinesList) {
  return {
    type: EDIT_GET_MACHINES_SUCCESS,
    machinesList,
  };
}

export function getMachinesError(error) {
  return {
    type: EDIT_GET_MACHINES_ERROR,
    error,
  };
}

