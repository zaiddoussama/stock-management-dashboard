import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { ravListStore } from "../../app/applicationStates";
import { getRavList } from "./action";
import reducer from "./reducer";
import saga from "./saga";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RavCard from "../../components/RavCard/RavCard";

const key = ravListStore;
function RavListContainer() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const ravs = useSelector(state => state?.[key]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRavList());
  }, []);

  return (
    <Box>
      <Grid container spacing={3} sx={{ flexWrap: "wrap" }}>
        {ravs?.data?.length > 0 && ravs.data.map(item => <RavCard item={item} key={item.idRavitailleur} />)}
      </Grid>
    </Box>
  );
}

export default RavListContainer;
