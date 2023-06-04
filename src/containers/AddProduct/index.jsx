import "./addProduct.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { addProductStore, getProductTypesStore } from "../../app/applicationStates";
import { addProduct, getProductTypes } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { useNavigate } from "react-router-dom";

const key = addProductStore;

export function AddProductContainer() {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const productAddOutput = useSelector(state => state?.[key]) || initialState;

	const [nom, setNom] = useState("");
	const [quantite, setQuantite] = useState(0);
	const [idTypeProduit, setIdTypeProduit] = useState(
		parseInt(productAddOutput?.productTypes?.data?.[0]?.idTypeProduit)
	);
	const [image, setImage] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		dispatch(getProductTypes());
	}, []);

	const onFileChange = e => {
		setImage(e.target.files[0]);
	};

	const handleClick = event => {
		event.preventDefault();

		if (!nom?.trim()) {
			setError("Name is required");

			setTimeout(() => {
				setError(null);
			}, 1000);

			return;
		}

		dispatch(
			addProduct({
				nom: nom,
				quantite: parseFloat(quantite),
				image: image,
				idTypeProduit: parseInt(idTypeProduit),
			})
		);

		if (!error) {
			setTimeout(() => {
				navigate(-1);
			}, 1000);
		}
	};

	return (
		<div className="newClient">
			{(productAddOutput?.data?.loading || productAddOutput?.data?.loading) && <Loader />}
			{productAddOutput?.data?.success && !error && (
				<AlertPopup type="success" message="Product added" />
			)}
			{(productAddOutput?.data?.error || productAddOutput?.data?.error) && (
				<AlertPopup type="error" message="a problem occured" />
			)}
			{error && <AlertPopup type="warning" message={error} />}

			<h1 className="newClientTitle">New Product</h1>
			<form className="newClientForm">
				<div className="newClientItem">
					<label>Name</label>
					<input type="text" value={nom} onChange={e => setNom(e.target.value)} />
				</div>

				<div className="newClientItem">
					<label>Quantity</label>
					<input type="text" value={quantite} onChange={e => setQuantite(e.target.value)} />
				</div>

				<div className="newClientItem">
					<label>Product Type</label>
					<select
						onChange={e => setIdTypeProduit(e.target.value)}
						className="newClientSelect"
						value={idTypeProduit}
						name="active"
						id="active">
						{productAddOutput?.productTypes?.data?.map(item => (
							<option key={item.idTypeProduit} value={item.idTypeProduit}>
								{item?.libelleTypeProduit}
							</option>
						))}
					</select>
				</div>

				<div className="newClientItem">
					<label>Product Type</label>
					<input type="file" onChange={onFileChange} />
				</div>

				<button className="newClientButton" onClick={handleClick}>
					Create
				</button>
			</form>
		</div>
	);
}
