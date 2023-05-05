import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { historyStore } from "../../app/applicationStates";
import { getHistory } from "./action";
import reducer from "./reducer";
import saga from "./saga";
import { useParams } from "react-router-dom";
import Tracker from "../../components/Tracker/Tracker";

const key = historyStore;
function HistoryContainer() {

  const { idProgramme } = useParams();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const history = useSelector(state => state?.[key]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistory(idProgramme));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("helllo");
  console.log(history);
  console.log("--------------------------ddddddddddddddddddddddddddddddddddddddd");

  if (history?.data?.length == 0) {
    return <h1>Ce ravitailleur n'a pas encore effectuer d'actions </h1>;
  }

  return <>
    <Tracker history={history?.data} />
  </>;
}

export default HistoryContainer;
