import "./newProductType.css";

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { addProductTypeStore } from "../../app/applicationStates";
import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import { addProductType } from "./action";
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress, Stack } from "@mui/material";


const options = [
  { label: 'KILOGRAMME', value: 'KG' },
  { label: 'LITRE', value: 'L' },
  { label: 'QUANTITY', value: 'QTE' },
];

const key = addProductTypeStore;

const NewProductType = () => {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [productType, setProductType] = useState("");
  const [unit, setUnit] = useState("KG");

  const productTypeAddOutput = useSelector((state) => state?.[key]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductType({
        libelleTypeProduit: productType,
        unite: unit,
      })
    );
  };

  return (
    <div className="newProductType">

      {productTypeAddOutput?.loading && <CircularProgress />}
      {productTypeAddOutput?.error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">a problem occured, try again !</Alert>
        </Stack>
      )}
      {productTypeAddOutput?.success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Product type added successfully !</Alert>
        </Stack>
      )}

      <h1 className="addProductTypeTitle">New Product Type</h1>
      <div className="addProductTypeItem">
        <TextField
          label="Product Type"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
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
          onClick={handleSubmit}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default NewProductType;
