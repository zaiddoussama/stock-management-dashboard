import {
  ADD_PROGRAM_WEEKLY,
  ADD_PROGRAM_WEEKLY_SUCCESS,
  ADD_PROGRAM_WEEKLY_ERROR
} from './constants';

export function addProgramWeekly(programWeekly) {
  return {
    type: ADD_PROGRAM_WEEKLY,
    programWeekly,
  };
}

export function addProgramWeeklySuccess(programWeekly) {
  return {
    type: ADD_PROGRAM_WEEKLY_SUCCESS,
    programWeekly,
  };
}

export function addProgramWeeklyError(programWeekly) {
  return {
    type: ADD_PROGRAM_WEEKLY_ERROR,
    programWeekly,
  };
}
