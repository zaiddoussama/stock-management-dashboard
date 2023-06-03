import "./product.css";

import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { getProductsStore } from "../../app/applicationStates";
import { deleteProduct, filterProducts, getProducts } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";

const key = getProductsStore;

export default function ProductListContainer() {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const productListData = useSelector(state => state?.[key]) || initialState;
	const dispatch = useDispatch();

	console.log(productListData?.products?.data);
	console.log("***************************");

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const handleDelete = id => {
		dispatch(deleteProduct(id));
		// eslint-disable-next-line eqeqeq
		dispatch(
			filterProducts(
				// eslint-disable-next-line eqeqeq
				productListData?.products?.data.filter(product => product?.idProduit != id)
			)
		);
	};

	const columns = [
		{
			field: "pathImage",
			headerName: "Image",
			width: 200,
			renderCell: params => {
				return (
					<div className="productListItem">
						<img className="productListImg" src={params?.row?.pathImage} alt="" />
						{params?.row?.nom}
					</div>
				);
			},
		},
		{ field: "idProduit", headerName: "ID", width: 120 },
		{
			field: "typeProduit",
			headerName: "Type",
			width: 120,
			valueGetter: params => {
				return params?.row?.typeProduit?.libelleTypeProduit;
			},
		},

		{ field: "nom", headerName: "PRODUCT NAME", width: 200 },
		{
			field: "quantite",
			headerName: "QUANTITE",
			width: 280,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: params => {
				return (
					<>
						<Link to={"/product/" + params?.row?.idProduit}>
							<button className="productListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="productListDelete"
							onClick={() => handleDelete(params?.row?.idProduit)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className="productList">
			{(productListData?.products?.loading ||
				productListData?.deleteProductBaseResponse?.loading) && <Loader />}
			{productListData?.deleteProductBaseResponse?.success && (
				<AlertPopup type="success" message="product deleted" />
			)}
			{(productListData?.products?.error || productListData?.deleteProductBaseResponse?.error) && (
				<AlertPopup type="error" message="a problem occured" />
			)}

			<div>
				<h1>Product list</h1>
				<Link to="/newproduct">
					<button className="productAddButton">New Product</button>
				</Link>
			</div>
			<DataGrid
				rows={productListData?.products?.data}
				disableSelectionOnClick
				columns={columns}
				getRowId={row => row?.idProduit}
				checkboxSelection
				autoHeight
			/>
		</div>
	);
}
