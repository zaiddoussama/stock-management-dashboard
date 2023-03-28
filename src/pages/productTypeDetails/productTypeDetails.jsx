import "./productTypeDetails.css";

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const options = [
  { label: 'Kilogramme', value: 'kg' },
  { label: 'Litre', value: 'l' },
  { label: 'Quantity', value: 'qty' },
];

const ProductTypeDetails = () => {
  const [productType, setProductType] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Type:', productType);
    console.log('Unit:', unit);
  };

  return (
    <div className="newProductType">
      <h1 className="addProductTypeTitle">Edit Product Type</h1>
      <form onSubmit={handleSubmit}  className="addProductTypeItem">
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
        >
          Edit
        </Button>
      </form>
    </div>
  );
};

export default ProductTypeDetails;
