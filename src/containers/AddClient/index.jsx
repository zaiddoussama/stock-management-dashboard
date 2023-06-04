import "./addClient.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { addClientStore } from "../../app/applicationStates";
import { addClient, getAvailableMachines } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { Checkbox, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material";
// import { CheckBox } from "@mui/icons-material";

const key = addClientStore;

export function AddClientContainer() {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [clientMachines, setClientMachines] = useState([]);
	const [selectedMachines, setSelectedMachines] = useState([]);
	const [image, setImage] = useState(null);
	const [error, setError] = useState(null);

	const clientAddOutput = useSelector(state => state?.[key]) || initialState;

	console.log(clientAddOutput);
	console.log("*************************************");

	const dispatch = useDispatch();

	useEffect(() => {
		setClientMachines(clientAddOutput?.machines?.data);
	}, [clientAddOutput]);

	const onFileChange = e => {
		setImage(e.target.files[0]);
	};

	const handleClick = event => {
		event.preventDefault();

		if (!name?.trim()) {
			setError("Client name is required");

			setTimeout(() => {
				setError(null);
			}, 3000);

			return;
		}

		if (!selectedMachines || selectedMachines?.length === 0) {
			setError("Please select some machine, or try to add new Machines into your system");

			setTimeout(() => {
				setError(null);
			}, 3000);

			return;
		}

		dispatch(
			addClient({
				nom: name,
				adress: address,
				image: image,
				machines: selectedMachines,
			})
		);
	};

	const handleSelectChange = event => {
		const value = event.target.value;

		setSelectedMachines(value);
	};

	useEffect(() => {
		dispatch(getAvailableMachines());
	}, []);

	return (
		<div className="newClient">
			{(clientAddOutput?.machines?.loading || clientAddOutput?.client?.loading) && <Loader />}
			{clientAddOutput?.client?.success && <AlertPopup type="success" message="client added" />}
			{(clientAddOutput?.machines?.error || clientAddOutput?.client?.error) && (
				<AlertPopup type="error" message="a problem occured" />
			)}
			{error && <AlertPopup type="error" message={error} />}

			<h1 className="newClientTitle">New Client</h1>
			<form className="newClientForm">
				<div className="newClientItem">
					<label>Client name</label>
					<input type="text" onChange={e => setName(e.target.value)} />
				</div>

				<div className="newClientItem">
					<label>Client address</label>
					<input type="text" onChange={e => setAddress(e.target.value)} />
				</div>

				<div className="newClientItem">
					<label>Client machines</label>
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
						{/* {updateClientOutput?.machines?.data.map((machine, index) => (
										<MenuItem key={index} value={machine?.idMachine}>
											<ListItemIcon>
												<Checkbox checked={selectedMachines?.indexOf(machine.idMachine) > -1} />
											</ListItemIcon>
											<ListItemText primary={machine?.numero} />
										</MenuItem>
									))} */}
						{clientMachines?.map((machine, index) => (
							<MenuItem key={index} value={machine?.idMachine}>
								<ListItemIcon>
									<Checkbox checked={selectedMachines?.indexOf(machine.idMachine) > -1} />
								</ListItemIcon>
								<ListItemText primary={machine?.numero} />
							</MenuItem>
						))}
					</Select>
				</div>

				<div className="newClientItem">
					<input type="file" onChange={onFileChange} />
				</div>

				<button className="newClientButton" onClick={e => handleClick(e)}>
					Create
				</button>
			</form>
		</div>
	);
}
