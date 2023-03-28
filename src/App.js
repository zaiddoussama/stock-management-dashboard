import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import RavitailleurList from "./pages/ravitailleurList/RavitailleurList";
import ProductTypeList from "./pages/productTypeList/productTypeList";
import NewProductType from "./pages/newProductType/newProductType";
import Machine from "./pages/machine/Machine";
import MachineDetails from "./pages/MachineDetails/MachineDetails";
import AddMachine from "./pages/AddMachine/AddMachine";

import history from "./utils/history";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading, error } = useAuth0();

  console.log(useAuth0())
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading .... </div>;
  }
  return (
    <Router history={history}>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>

          <Route path="/machines/add" exact>
            <AddMachine/>
          </Route>
          <Route path="/machines/:idMachine" exact>
            <MachineDetails/>
          </Route>
          <Route path="/machines">
            <Machine/>
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/ravitailleurs">
            <RavitailleurList />
          </Route>
          <Route path="/productType">
            <ProductTypeList />
          </Route>
          <Route path="/newproductType">
            <NewProductType />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
