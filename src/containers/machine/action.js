import {
  GET_MACHINES,
  GET_MACHINES_SUCCESS,
  GET_MACHINES_ERROR,
  DELETE_MACHINE,
  DELETE_MACHINE_SUCCESS,
  DELETE_MACHINE_ERROR,
  UPDATE_MACHINES
} from "./constants";

export function getMachines() {
  return {
    type: GET_MACHINES,
  };
}

export function getMachinesSuccess(machinesList) {
  return {
    type: GET_MACHINES_SUCCESS,
    machinesList,
  };
}

export function getMachinesError(error) {
  return {
    type: GET_MACHINES_ERROR,
    error,
  };
}

export function deleteMachine(id) {
  return {
    type: DELETE_MACHINE,
    id
  };
}

export function updateMachines(machines) {
  return {
    type: UPDATE_MACHINES,
    machines,
  };
}

export function deleteMachineSuccess(deleteMachine) {
  return {
    type: DELETE_MACHINE_SUCCESS,
    deleteMachine,
  };
}

export function deleteMachineError(error) {
  return {
    type: DELETE_MACHINE_ERROR,
    error,
  };
}
