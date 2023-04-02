import "./machine.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { machineList } from "../../dummyData";
import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { getMachinesStore } from "../../app/applicationStates";
import { getMachines } from "./action";
import reducer from "./reducer";
import saga from "./saga";

const key = getMachinesStore;

export default function Machine() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const machineAddOutput = useSelector((state) => state?.[key]);
  console.log(machineAddOutput);
  const dispatch = useDispatch();

  const [data, setData] = useState(machineList);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.idMachine !== id));
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
      <div className="machineTitleContainer">
        <h1>Machine list</h1>
        <Link to="/machines/add">
          <button className="machineAddButton">Add new machine</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row?.idMachine}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
