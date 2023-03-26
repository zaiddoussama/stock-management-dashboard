import "./machine.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { machineList } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Machine() {
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
