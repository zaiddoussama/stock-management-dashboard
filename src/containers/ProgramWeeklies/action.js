import {
  GET_PROGRAM_WEEKLIES,
  GET_PROGRAM_WEEKLIES_SUCCESS,
  GET_PROGRAM_WEEKLIES_ERROR,
  DELETE_PROGRAM_WEEKLY,
  DELETE_PROGRAM_WEEKLY_SUCCESS,
  DELETE_PROGRAM_WEEKLY_ERROR,
  FILTER_PROGRAM_WEEKLIES
} from "./constants";

export function getProgramWeeklies() {
  return {
    type: GET_PROGRAM_WEEKLIES,
  };
}

export function getProgramWeekliesSuccess(programWeeklies) {
  return {
    type: GET_PROGRAM_WEEKLIES_SUCCESS,
    programWeeklies,
  };
}

export function filterProgramWeeklies(programWeeklies) {
  return {
    type: FILTER_PROGRAM_WEEKLIES,
    programWeeklies,
  };
}

export function getProgramWeekliesError(error) {
  return {
    type: GET_PROGRAM_WEEKLIES_ERROR,
    error,
  };
}

export function deleteProgramWeekly(id) {
  return {
    type: DELETE_PROGRAM_WEEKLY,
    id
  };
}

export function deleteProgramWeeklySuccess(baseResponse) {
  return {
    type: DELETE_PROGRAM_WEEKLY_SUCCESS,
    baseResponse,
  };
}

export function deleteProgramWeeklyError(error) {
  return {
    type: DELETE_PROGRAM_WEEKLY_ERROR,
    error,
  };
}
