import { createSelector } from 'reselect';

import { todoStore } from '../../app/applicationStates';
import { initialState } from './reducer';

const selectTodo = state => state?.[todoStore] || initialState;

const makeSelectTodo = () =>
  createSelector(
    selectTodo,
    todoState => todoState,
  );

export { makeSelectTodo };