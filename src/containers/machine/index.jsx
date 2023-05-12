import "./machine.css";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { getMachinesStore } from "../../app/applicationStates";
import { deleteMachine, getMachines, updateMachines } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";

const key = getMachinesStore;

export default function MachineList() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const machineListData = useSelector((state) => state?.[key]) || initialState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMachines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteMachine(id));
    // eslint-disable-next-line eqeqeq
    dispatch(
      updateMachines(
        // eslint-disable-next-line eqeqeq
        machineListData?.data.filter((machine) => machine?.idMachine != id)
      )
    );
  };

  const columns = [
    { field: "idMachine", headerName: "ID", width: 90 },

    { field: "typeMachine", headerName: "TYPE MACHINE", width: 200 },
    {
      field: "numero",
      headerName: "NUMERO",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/machines/" + params?.row?.idMachine}>
              <button className="machineListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="machineListDelete"
              onClick={() => handleDelete(params?.row?.idMachine)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getMachines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="machineList">
      {(machineListData?.loading ||
        machineListData?.deleteMachine?.loading) && <Loader />}
      {(machineListData?.error || machineListData?.deleteMachine?.error) && (
        <AlertPopup type="error" message="a problem occured" />
      )}
      {machineListData?.deleteMachine?.success && (
        <AlertPopup type="success" message="machine deleted" />
      )}
      <div>
        <h1>Machine list</h1>
        <Link to="/machines/add">
          <button className="machineAddButton">Add new machine</button>
        </Link>
      </div>
      <DataGrid
        rows={machineListData?.data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row?.idMachine}
        checkboxSelection
      />
    </div>
  );
}
