import "./programWeeklyList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { programWeeklyRows } from "../../dummyData";
import { getProgramWeekliesStore } from "../../app/applicationStates";
import injectReducer, { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { deleteProgramWeekly, filterProgramWeeklies, getProgramWeeklies } from "./action";

const key = getProgramWeekliesStore;

export default function ProgramWeeklyList() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const programWeeklyListData = useSelector((state) => state?.[key]) || initialState;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProgramWeeklies());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (id) => {
        dispatch(deleteProgramWeekly(id));
        // eslint-disable-next-line eqeqeq
        dispatch(
            filterProgramWeeklies(
                // eslint-disable-next-line eqeqeq
                programWeeklyListData?.programWeeklies?.data.filter((programWeekly) => programWeekly?.idProgrammeWeekly != id)
            )
        );
    };

    const columns = [
        {
            field: "idProgrammeWeekly",
            headerName: "ID",
            width: 90
        },
        {
            field: "dateDebutProgramme",
            headerName: "start Date",
            width: 200,
        },
        {
            field: "dateFinProgramme",
            headerName: "end Date",
            width: 200,
        },
        {
            field: "ravitailleur",
            headerName: "ravitailleur",
            width: 200,
            valueGetter: (params) => params.row.ravitailleur.username,
        },
        {
            field: "description",
            headerName: "description",
            width: 200,
            valueGetter: (params) => params.row.description,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/editProgramWeekly/" + params.row.idProgrammeWeekly}>
                            <button className="programWeeklyListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="programWeeklyListDelete"
                            onClick={() => handleDelete(params.row.idProgrammeWeekly)}
                        />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getProgramWeeklies());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="programWeeklyList">
            {(programWeeklyListData?.programWeeklies?.loading ||
                programWeeklyListData?.deleteProgramWeekly?.loading) && <Loader />}
            {programWeeklyListData?.deleteProgramWeekly?.success && (
                <AlertPopup type="success" message="program deleted successfully" />
            )}
            {(programWeeklyListData?.programWeeklies?.error ||
                programWeeklyListData?.deleteProgramWeekly?.error) && (
                    <AlertPopup type="error" message="a problem occured" />
                )}

            <div className="programWeeklyTitleContainer">
                <h1>Program weekly list</h1>
                <Link to="/newprogramweekly">
                    <button className="programWeeklyAddButton">Add</button>
                </Link>
            </div>
            <DataGrid
                rows={programWeeklyListData?.programWeeklies?.data}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row?.idProgrammeWeekly}
                checkboxSelection
            />
        </div>
    );
}