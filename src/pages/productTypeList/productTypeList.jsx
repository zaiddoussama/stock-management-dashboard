import "./productTypeList.css";
import React, { useState } from 'react';
import { productTypeRows } from "../../dummyData";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";


export default function ProductListType() {

  const [data, setData] = useState(productTypeRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "productType",
      headerName: "Product Type",
      width: 200,
    },
    { field: "unit", headerName: "Unit", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editProducType/" + params.row.id}>
              <button className="productTypeListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productTypeListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productTypeList">
      <div className="productTypeTitleContainer">
        <h1>Product type list</h1>
        <Link to="/newproductType">
          <button className="productTypeAddButton">Add</button>
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

