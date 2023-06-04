import { Link, useNavigate } from "react-router-dom";
import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import "./clientDetails.css";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { updateClientStore } from "../../app/applicationStates";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAvailableMachines } from "../AddClient/action";
import { getClient, updateClient } from "./action";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { Checkbox, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material";
// import { CheckBox, DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@material-ui/data-grid";
import { deleteMachine, updateMachines } from "../machine/action";

const key = updateClientStore;

export default function ClientDetailsContainer() {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const dispatch = useDispatch();

	const [clientName, setClientName] = useState("");
	const [clientAddress, setClientAddress] = useState("");
	const [clientMachines, setClientMachines] = useState([]);
	const [selectedMachines, setSelectedMachines] = useState([]);
	const [image, setImage] = useState(null);

	const idClient = parseInt(window.location.href.split("/").at(-1));

	const updateClientOutput = useSelector(state => state?.[updateClientStore]) || initialState;

	useEffect(() => {
		// setClientMachines([]);
		setClientMachines(
			updateClientOutput?.currentClient?.data?.machines?.concat(updateClientOutput?.machines?.data)
		);

		setSelectedMachines(
			updateClientOutput?.currentClient?.data?.machines?.map(m => m?.idMachine) || []
		);
	}, [updateClientOutput]);

	const navigate = useNavigate();

	const onClick = event => {
		event.preventDefault();
		dispatch(
			updateClient({
				idClient,
				nom: clientName,
				adress: clientAddress,
				image: image,
				machines: selectedMachines,
			})
		);

		setTimeout(() => {
			navigate(-1);
		}, 1000);
	};

	const onFileChange = e => {
		setImage(e.target.files[0]);
	};

	const handleSelectChange = event => {
		const value = event.target.value;

		setSelectedMachines(value);
	};

	const handleDelete = id => {
		dispatch(deleteMachine(id));
	};

	useEffect(() => {
		dispatch(getClient(idClient));
	}, []);

	useEffect(() => {
		dispatch(getAvailableMachines());
	}, []);

	console.log(updateClientOutput);
	console.log("********************************");

	useEffect(() => {
		setClientAddress(updateClientOutput?.currentClient?.data?.adress || "");
		setClientName(updateClientOutput?.currentClient?.data?.nom || "");
	}, [updateClientOutput?.currentClient]);

	const columns = [
		{ field: "idMachine", headerName: "ID", width: 90 },

		{ field: "typeMachine", headerName: "TYPE MACHINE", width: 200 },
		{
			field: "numero",
			headerName: "NUMERO",
			width: 120,
		},
		// {
		// 	field: "action",
		// 	headerName: "Action",
		// 	width: 150,
		// 	renderCell: params => {
		// 		return (
		// 			<>
		// 				<Link to={"/machines/" + params?.row?.idMachine}>
		// 					<button className="machineListEdit">Edit</button>
		// 				</Link>
		// 				<DeleteOutline
		// 					className="machineListDelete"
		// 					onClick={() => handleDelete(params?.row?.idMachine)}
		// 				/>
		// 			</>
		// 		);
		// 	},
		// },
	];

	return (
		<div className="client">
			{(updateClientOutput?.loading ||
				updateClientOutput?.machines?.loading ||
				updateClientOutput?.currentClient?.loading) && <Loader />}
			{updateClientOutput?.data?.success && <AlertPopup type="success" message="client updated" />}
			{(updateClientOutput?.data?.error ||
				updateClientOutput?.machines?.error ||
				updateClientOutput?.currentClient?.error) && (
				<AlertPopup type="error" message="a problem occured" />
			)}
			<div className="clientTitleContainer">
				<h1 className="clientTitle">Edit Client</h1>
				<Link to="/clients/add">
					<button className="clientAddButton">Create</button>
				</Link>
			</div>
			<div className="clientContainer">
				<div className="clientUpdate">
					<span className="clientUpdateTitle">Edit</span>
					<form className="clientUpdateForm">
						<div className="clientUpdateLeft">
							<div className="clientUpdateItem">
								<label>Client name</label>
								<input
									value={clientName}
									onChange={e => setClientName(e.target.value)}
									type="text"
									className="clientUpdateInput"
								/>
							</div>
							<div className="clientUpdateItem">
								<label>Client address</label>
								<input
									value={clientAddress}
									onChange={e => setClientAddress(e.target.value)}
									type="text"
									className="clientUpdateInput"
								/>
							</div>
							<div className="clientUpdateItem">
								<label>Client Machines</label>
								<Select
									labelId="demo-simple-select-filled-label"
									id="demo-simple-select-filled"
									value={selectedMachines}
									label="Machines"
									multiple
									variant="outlined"
									onChange={handleSelectChange}
									renderValue={selectedMachines => selectedMachines?.join(", ")}>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{clientMachines?.map((machine, index) => (
										<MenuItem key={index} value={machine?.idMachine}>
											<ListItemIcon>
												<Checkbox checked={selectedMachines?.indexOf(machine.idMachine) > -1} />
											</ListItemIcon>
											<ListItemText primary={machine?.numero} />
										</MenuItem>
									))}
								</Select>
								<br />
							</div>
							<div>
								<hr />
							</div>
							<div className="clientUpdateItem">
								<input type="file" onChange={onFileChange} />
							</div>
						</div>
						<div className="clientUpdateRight">
							<button className="clientUpdateButton" onClick={onClick}>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
			<br />
			<br />
			<br />
			<h1 className="clientTitle">Client Machines</h1>
			<br />

			<div className="machineList">
				{(updateClientOutput?.machines?.loading || updateClientOutput?.machines?.loading) && (
					<Loader />
				)}
				{(updateClientOutput?.machines?.error ||
					updateClientOutput?.machines?.deleteMachine?.error) && (
					<AlertPopup type="error" message="a problem occured" />
				)}
				{updateClientOutput?.machines?.deleteMachine?.success && (
					<AlertPopup type="success" message="machine deleted" />
				)}
				<DataGrid
					rows={updateClientOutput?.currentClient?.data?.machines || []}
					disableSelectionOnClick
					columns={columns}
					getRowId={row => row?.idMachine}
					checkboxSelection
					autoHeight
				/>
			</div>
		</div>
	);
}
