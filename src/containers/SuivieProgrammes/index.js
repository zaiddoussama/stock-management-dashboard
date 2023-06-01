import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { programmeListStore } from "../../app/applicationStates";
import { getProgrammeList } from "./action";
import reducer from "./reducer";
import saga from "./saga";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProgramCard from "../../components/ProgramCard/ProgramCard";
import { useParams } from "react-router-dom";

const key = programmeListStore;
function ProgramListContainer() {

  const { id } = useParams();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const programmes = useSelector(state => state?.[key]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProgrammeList(id));
  }, []);

  return (
    <Box>
      <Grid container spacing={3} sx={{ flexWrap: "wrap" }}>
        {programmes?.data?.length > 0 && programmes.data.map(item => <ProgramCard item={item} key={item.idProgrammeWeekly} />)}
      </Grid>
    </Box>
  );
}

export default ProgramListContainer;
