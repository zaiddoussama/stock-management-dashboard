import "./productTypeDetails.css";

import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { getProductTypesStore, updateProductTypeStore } from "../../app/applicationStates";
import { useDispatch, useSelector } from "react-redux";
import { getProductType, updateProductType } from "./action";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "@material-ui/core";

const options = [
	{ id: 1, label: "Kilogramme", value: "KG" },
	{ id: 2, label: "Litre", value: "L" },
	{ id: 3, label: "Quantity", value: "QTE" },
];

const key = updateProductTypeStore;

const ProductTypeDetails = () => {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const dispatch = useDispatch();

	const { id } = useParams();

	const navigate = useNavigate();

	const productTypeUpdate = useSelector(state => state?.[updateProductTypeStore]) || initialState;

	const [productType, setProductType] = useState(productTypeUpdate?.data?.libelleTypeProduit);
	const [unit, setUnit] = useState(productTypeUpdate?.data?.unite);

	useEffect(() => {
		setProductType(productTypeUpdate?.data?.libelleTypeProduit);
		setUnit(productTypeUpdate?.data?.unite);
	}, [productTypeUpdate]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(
			updateProductType({
				idTypeProduit: id,
				libelleTypeProduit: productType,
				unite: unit,
			})
		);

		setTimeout(() => {
			navigate(-1);
		}, 500);
	};

	useEffect(() => {
		dispatch(getProductType(id));
	}, []);

	return (
		<div className="newProductType">
			{productTypeUpdate?.data?.loading && <Loader />}
			{productTypeUpdate?.data?.success && (
				<AlertPopup type="success" message="product type updated" />
			)}
			{productTypeUpdate?.data?.error && <AlertPopup type="error" message="a problem occured" />}

			<h1 className="addProductTypeTitle">Edit Product Type</h1>
			<form onSubmit={handleSubmit} className="addProductTypeItem">
				<TextField
					label="Product Type"
					onInput={e => setProductType(e.target.value)}
					variant="outlined"
					value={productType}
					margin="normal"
					fullWidth
				/>
				<Select
					label="Unit"
					onChange={e => setUnit(e.target.value)}
					variant="outlined"
					margin="normal"
					fullWidth
					value={unit}
					defaultValue={"KG"}>
					{options.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
				<Button variant="contained" color="primary" type="submit">
					Edit
				</Button>
			</form>
		</div>
	);
};

export default ProductTypeDetails;
