import "./ravitailleurList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import { deleteRavitailleur, getRavitailleurs, updateRavitailleurs } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import AlertPopup from "../../components/Alert";
import Loader from "../../components/Loader";
import { getRavitailleursStore } from "../../app/applicationStates";

const key = getRavitailleursStore;

export default function RavitailleurList() {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const ravitailleursListData = useSelector(state => state?.[key]) || initialState;
	console.log(ravitailleursListData);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRavitailleurs());
	}, []);

	const handleDelete = username => {
		dispatch(deleteRavitailleur(username));

		dispatch(
			updateRavitailleurs(ravitailleursListData?.data?.filter(user => user.username != username))
		);
	};

	const columns = [
		{ field: "idRavitailleur", headerName: "ID", width: 90 },
		{
			field: "nom",
			headerName: "User",
			width: 200,
		},
		{ field: "email", headerName: "Email", width: 200 },
		{
			field: "telephone",
			headerName: "Telephone",
			width: 120,
		},
		{
			field: "username",
			headerName: "Username",
			width: 160,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: params => {
				return (
					<>
						<Link to={"/ravitailleur/" + params.row.username}>
							<button className="userListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="userListDelete"
							onClick={() => handleDelete(params.row.username)}
						/>
					</>
				);
			},
		},
	];

	useEffect(() => {
		dispatch(getRavitailleurs());
	}, []);

	return (
		<div className="userList">
			{(ravitailleursListData?.loading || ravitailleursListData?.deleteRavitailleur?.loading) && (
				<Loader />
			)}
			{(ravitailleursListData?.error || ravitailleursListData?.deleteRavitailleur?.error) && (
				<AlertPopup type="error" message="a problem occured" />
			)}
			{ravitailleursListData?.deleteRavitailleur?.success && (
				<AlertPopup type="success" message="ravitailleur deleted" />
			)}

			<div>
				<h1>Ravitailleur List</h1>
				<Link to="/newRavitailleur">
					<button className="userAddButton">Add</button>
				</Link>
			</div>

			<DataGrid
				rows={ravitailleursListData?.data}
				disableSelectionOnClick
				columns={columns}
				getRowId={row => row?.idRavitailleur}
				checkboxSelection
			/>
		</div>
	);
}
