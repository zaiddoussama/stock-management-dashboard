import "./productTypeList.css";
import React, { useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { getProductTypesStore } from "../../app/applicationStates";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductType, getProductTypes, updateProductTypes } from "./action";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import AlertPopup from "../../components/Alert";
import Loader from "../../components/Loader";

const key = getProductTypesStore;

export default function ProductListType() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const productTypesListData = useSelector((state) => state?.[key]) || initialState;
    console.log(productTypesListData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductTypes())
    }, [])

    const handleDelete = (id) => {
        dispatch(deleteProductType(id));

        dispatch(
            updateProductTypes(
                productTypesListData?.data.filter((productType) => productType.idTypeProduit != id)
            )
        );
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
                        <Link to={"/editProducType/" + params?.row?.idTypeProduit}>
                            <button className="productTypeListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productTypeListDelete"
                            onClick={() => handleDelete(params?.row?.idTypeProduit)}
                        />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getProductTypes());
    }, []);

    return (
        <div className="productTypeList">

            {(productTypesListData?.loading ||
                productTypesListData?.deleteProductType?.loading) && <Loader />}
            {(productTypesListData?.error || productTypesListData?.deleteProductType?.error) && (
                <AlertPopup type="error" message="a problem occured" />
            )}
            {productTypesListData?.deleteProductType?.success && (
                <AlertPopup type="success" message="product type deleted" />
            )}

            <div>
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
                checkboxSelection
            />
        </div>
    );
}

