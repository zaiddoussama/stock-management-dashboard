import "./client.css";

import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { getClientsStore } from "../../app/applicationStates";
import { deleteClient, filterClients, getClients } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";

const key = getClientsStore;

export default function ClientListContainer() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const clientListData = useSelector((state) => state?.[key]) || initialState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteClient(id));
    // eslint-disable-next-line eqeqeq
    dispatch(
      filterClients(
        // eslint-disable-next-line eqeqeq
        clientListData?.clients?.data.filter((client) => client?.idClient != id)
      )
    );
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
      {(clientListData?.clients?.loading ||
        clientListData?.deleteClientBaseResponse?.loading) && <Loader />}
      {clientListData?.deleteClientBaseResponse?.success && (
        <AlertPopup type="success" message="client deleted" />
      )}
      {(clientListData?.clients?.error ||
        clientListData?.deleteClientBaseResponse?.error) && (
        <AlertPopup type="error" message="a problem occured" />
      )}

      <div>
        <h1>Client list</h1>
        <Link to="/clients/add">
          <button className="clientAddButton">Add new client</button>
        </Link>
      </div>
      <DataGrid
        rows={clientListData?.clients?.data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row?.idClient}
        checkboxSelection
      />
    </div>
  );
}
