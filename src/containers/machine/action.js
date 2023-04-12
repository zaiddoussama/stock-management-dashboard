import {
  GET_MACHINES,
  GET_MACHINES_SUCCESS,
  GET_MACHINES_ERROR,
  DELETE_MACHINE,
  DELETE_MACHINE_SUCCESS,
  DELETE_MACHINE_ERROR
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

export function deleteMachines(id) {
  return {
    type: DELETE_MACHINE,
    id
  };
}

export function deleteMachineSuccess(machinesList) {
  return {
    type: DELETE_MACHINE_SUCCESS,
    machinesList,
  };
}

export function deleteMachineError(error) {
  return {
    type: DELETE_MACHINE_ERROR,
    error,
  };
}
