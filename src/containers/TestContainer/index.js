import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";

import { todoStore } from "../../app/applicationStates";
import { loadTODO } from "./action";
import reducer from "./reducer";
import saga from "./saga";
import { useSelector } from "react-redux";

const key = todoStore
function TestContainer() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const output = useSelector(state => state?.[key]);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTODO());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return output;
}

export default TestContainer;
