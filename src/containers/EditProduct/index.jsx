// import "./productDetails.css";

import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { updateProductStore, getProductTypesStore } from "../../app/applicationStates";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateProduct } from "./action";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { getProductTypes } from "../ProductTypes/action";

const key = updateProductStore;

const ProductUpdateContainer = () => {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const dispatch = useDispatch();

	const { productId } = useParams();

	const navigate = useNavigate();

	const productUpdate = useSelector(state => state?.[key]) || initialState;
	const productTypes = useSelector(state => state?.[getProductTypesStore]);

	useEffect(() => {
		if (!productTypes) {
			dispatch(getProductTypes());
		}
	}, [dispatch]);

	// useEffect(() => {
	// 	if (productId) {
	// 		dispatch(getProduct(productId));
	// 	}
	// }, [productId, dispatch]);

	const [nom, setNom] = useState(productUpdate?.data?.nom);
	const [quantite, setQuantite] = useState(productUpdate?.data?.quantite);
	const [idTypeProduit, setIdTypeProduit] = useState(
		productUpdate?.data?.typeProduit?.idTypeProduit
	);
	const [image, setImage] = useState(null);
	const [pathImage, setPathImage] = useState(productUpdate?.data?.pathImage);
	const [error, setError] = useState("");

	const onFileChange = e => {
		setImage(e.target?.files?.[0]);
	};

	const handleClick = event => {
		event.preventDefault();

		dispatch(
			updateProduct({
				idProduit: productId,
				nom: nom,
				quantite: parseFloat(quantite),
				image: image,
				idTypeProduit: parseInt(idTypeProduit),
			})
		);

		setError(productUpdate?.error);

		if (productUpdate?.success) {
			setTimeout(() => {
				navigate(-1);
			}, 1000);
		}
	};

	useEffect(() => {
		if (productId) {
			dispatch(getProduct(productId));
		}
	}, [productId, dispatch]);


	return (
		<div className="newProduct">
			{productUpdate?.data?.loading && <Loader />}
			{productUpdate?.data?.success && <AlertPopup type="success" message="product type updated" />}
			{productUpdate?.data?.error && <AlertPopup type="error" message="a problem occured" />}

			<h1 className="addProductTitle">Edit Product </h1>

			<form className="newClientForm">
				{/* <div>
					<img src={process.env.REACT_APP_BASE_URL + pathImage} alt=""></img>
				</div> */}
				<div className="newClientItem">
					<label>Name</label>
					<input type="text" value={nom} onInput={e => setNom(e.target.value)} />
				</div>

				<div className="newClientItem">
					<label>Quantity</label>
					<input type="text" value={quantite} onInput={e => setQuantite(e.target.value)} />
				</div>

				<div className="newClientItem">
					<label>Product Type</label>
					<select
						onChange={e => setIdTypeProduit(e.target.value)}
						className="newClientSelect"
						value={idTypeProduit || 0}
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
					Edit
				</button>
			</form>
		</div>
	);
};

export default ProductUpdateContainer;
