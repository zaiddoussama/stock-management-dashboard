import "./productTypeList.css";
import React, { useEffect, useState } from 'react';
import { productTypeRows } from "../../dummyData";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { getProductTypesStore } from "../../app/applicationStates";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductTypes, getProductTypes } from "./action";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { Alert, CircularProgress, Stack } from "@mui/material";

const key = getProductTypesStore;

export default function ProductListType() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const productTypesListData = useSelector((state) => state?.[key]) || initialState;
    console.log(productTypesListData);
    console.log("MOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOAAAAAAAAAAAAAAAAAADDDDDDDDDDDDDD");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductTypes())
    }, [])

    const handleDelete = (id) => {
        dispatch(deleteProductTypes(id))
    };

    const columns = [
        { field: "idTypeProduit", headerName: "ID", width: 90 },
        {
            field: "libelleTypeProduit",
            headerName: "Product Type",
            width: 200,
        },
        { field: "unite", headerName: "Unit", width: 200 },
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
                            onClick={() => handleDelete(params?.row?.id)}
                        />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getProductTypes())
    }, []);

    return (
        <div className="productTypeList">
            {productTypesListData?.loading && <CircularProgress />}
            {productTypesListData?.error && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">a problem occured, try again !</Alert>
                </Stack>
            )}

            <div className="productTypeTitleContainer">
                <h1>Product type list</h1>
                <Link to="/newproductType">
                    <button className="productTypeAddButton">Add</button>
                </Link>
            </div>
            <DataGrid
                rows={productTypesListData?.data}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row?.idTypeProduit}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}

