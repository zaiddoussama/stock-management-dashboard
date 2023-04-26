import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";

function Loader({ show }) {
  return (
    <Box sx={{ display: "flex", bgcolor: red }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
