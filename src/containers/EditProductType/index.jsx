import "./productTypeDetails.css";

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { getProductTypesStore, updateProductTypeStore } from "../../app/applicationStates";
import { useDispatch, useSelector } from "react-redux";
import { updateProductType } from "./action";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";

const options = [
  { label: 'Kilogramme', value: 'KG' },
  { label: 'Litre', value: 'L' },
  { label: 'Quantity', value: 'QTE' },
];

const key = updateProductTypeStore;

const ProductTypeDetails = () => {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  const onClick = (event) => {
    event.preventDefault();
    dispatch(updateProductType({
      idTypeProduit: parseInt(window.location.href.split("/").at(-1)),
      libelleTypeProduit: productType,
      unite: unit
    }))
  };

  const productTypeUpdate = useSelector((state) => state?.[updateProductTypeStore]) || initialState;
  const productTypeListData = useSelector((state) => state?.[getProductTypesStore]) || {
    ...initialState,
    data: {},
  };
  const productTypeToUpdate = productTypeListData?.data?.filter(
    (productType) =>
      productType?.idTypeProduit === parseInt(window.location.href.split("/").at(-1))
  )?.[0];

  const [productType, setproductType] = useState(productTypeToUpdate?.libelleTypeProduit);
  const [unit, setUnit] = useState(productTypeToUpdate?.unite);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductType({
      idTypeProduit: parseInt(window.location.href.split("/").at(-1)),
      libelleTypeProduit: productType,
      unite: unit
    }))
  };

  return (
    <div className="newProductType">

      {productTypeUpdate?.loading && <Loader />}
      {productTypeUpdate?.success && <AlertPopup type="success" message="product type updated" />}
      {productTypeUpdate?.error && <AlertPopup type="error" message="a problem occured" />}

      <h1 className="addProductTypeTitle">Edit Product Type</h1>
      <form onSubmit={handleSubmit} className="addProductTypeItem">
        <TextField
          label="Product Type"
          value={productType}
          onChange={(e) => setproductType(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          select
          label="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Edit
        </Button>
      </form>
    </div>
  );
};

export default ProductTypeDetails;
