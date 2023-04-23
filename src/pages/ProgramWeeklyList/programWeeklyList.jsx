import "./programWeeklyList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { programWeeklyRows } from "../../dummyData";

export default function ProgramWeeklyList() {
  const [data, setData] = useState(programWeeklyRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90
    },
    {
      field: "startDate",
      headerName: "start Date",
      width: 200,
    },
    {
      field: "endDate",
      headerName: "end Date",
      width: 200,
    },
    {
      field: "client",
      headerName: "client",
      width: 200,
    },
    {
      field: "ravitailleur",
      headerName: "ravitailleur",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editProducType/" + params.row.id}>
              <button className="programWeeklyListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="programWeeklyListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="programWeeklyList">
      <div className="programWeeklyTitleContainer">
        <h1>Program weekly list</h1>
        <Link to="/newprogramweekly">
          <button className="programWeeklyAddButton">Add</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}