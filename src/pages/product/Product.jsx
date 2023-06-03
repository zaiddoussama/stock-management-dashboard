import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import ProductUpdateContainer from "../../containers/EditProduct";

export default function Product() {
  return (
    <ProductUpdateContainer />
  );
}
