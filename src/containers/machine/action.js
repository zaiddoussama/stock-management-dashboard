import {
  GET_MACHINES,
  GET_MACHINES_SUCCESS,
  GET_MACHINES_ERROR,
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
