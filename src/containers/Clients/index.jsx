import "./client.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { CircularProgress } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { clientList } from "../../dummyData";
import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { getClientsStore } from "../../app/applicationStates";
import { deleteClient, getClients } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";

const key = getClientsStore;

export default function ClientListContainer() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const clientListData = useSelector((state) => state?.[key]) || initialState;
  console.log(clientListData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients())
  },[])

  const handleDelete = (id) => {
    dispatch(deleteClient(id));
  };

  const columns = [
    { field: "idClient", headerName: "ID", width: 90 },

    { field: "nom", headerName: "CLIENT NAME", width: 200 },
    {
      field: "adress",
      headerName: "CLIENT ADDRESS",
      width: 280,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/clients/" + params?.row?.idClient}>
              <button className="clientListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="clientListDelete"
              onClick={() => handleDelete(params?.row?.idClient)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getClients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="clientList">
            {clientListData?.loading && <CircularProgress />}
      {clientListData?.error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">a problem occured, try again !</Alert>
        </Stack>
      )}
      <div className="clientTitleContainer">
        <h1>Client list</h1>
        <Link to="/clients/add">
          <button className="clientAddButton">Add new client</button>
        </Link>
      </div>
      <DataGrid
        rows={clientListData?.data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row?.idClient}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
