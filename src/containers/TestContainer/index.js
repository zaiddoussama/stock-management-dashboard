import React from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { createSelector } from 'reselect';

import { todoStore } from "../../app/applicationStates";
import { loadTODO } from "./action";
import reducer from "./reducer";
import saga from "./saga";
import { makeSelectTodo } from "./selector";
import { useSelector } from "react-redux";

function TestContainer() {
  useInjectReducer({ todoStore, reducer });
  useInjectSaga({ todoStore, saga });

  const selector = createSelector({
    todo: makeSelectTodo()
  });

  const output = useSelector(selector);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTODO());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return output;
}

export default TestContainer;
