import "./addProduct.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { addProductStore, getProductTypesStore } from "../../app/applicationStates";
import { addProduct } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { getProductTypes } from "../ProductTypes/action";

const key = addProductStore;

export function AddProductContainer() {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const dispatch = useDispatch();

	const productAddOutput = useSelector(state => state?.[key]) || initialState;
	const productTypes = useSelector(state => state?.[getProductTypesStore]);

	const [nom, setNom] = useState("");
	const [quantite, setQuantite] = useState(0);
	const [idTypeProduit, setIdTypeProduit] = useState(productTypes?.[0]?.idTypeProduit);
	const [image, setImage] = useState(null);

	useEffect(() => {
		if (!productTypes) {
			dispatch(getProductTypes());
		}
	}, [dispatch]);

	const onFileChange = e => {
		setImage(e.target.files[0]);
	};

	const handleClick = event => {
		event.preventDefault();
		dispatch(
			addProduct({
				nom: nom,
				quantite: parseFloat(quantite),
				image: image,
				idTypeProduit: parseInt(idTypeProduit),
			})
		);
	};

	return (
		<div className="newClient">
			{(productAddOutput?.data?.loading || productAddOutput?.data?.loading) && <Loader />}
			{productAddOutput?.data?.success && <AlertPopup type="success" message="Product added" />}
			{(productAddOutput?.data?.error || productAddOutput?.data?.error) && (
				<AlertPopup type="error" message="a problem occured" />
			)}

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
						{productTypes?.data.map(item => (
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
