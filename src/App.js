import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { Router, Switch, Route } from "react-router-dom";
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
import ProductTypeDetails from "./pages/productTypeDetails/productTypeDetails";
import ProgramWeeklyList from "./pages/ProgramWeeklyList/programWeeklyList";
import NewProgramWeekly from "./pages/newProgramWeekly/newProgramWeekly";

import history from "./app/history";
import Login from "./pages/Login/Login";
import AddClient from "./pages/AddClient/AddClient";
import Clients from "./pages/Clients/Clients";
import ClientDetails from "./pages/ClientDetails/ClientDetails";
import Suivie from "./pages/Suivie/Suivie";
import SuivieRavPage from "./pages/Suivie/SuivieRavPage";
import SuivieProgrammePage from "./pages/Suivie/SuivieProgrammePage";
import SuivieHistory from "./pages/Suivie/SuivieHistory";

function App() {

  return (
    <Router history={history}>

      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
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
            <AddMachine />
          </Route>
          <Route path="/machines/:idMachine" exact>
            <MachineDetails />
          </Route>
          <Route path="/machines">
            <Machine />
          </Route>


          <Route path="/clients/add" exact>
            <AddClient />
          </Route>
          <Route path="/clients/:idClient" exact>
            <ClientDetails />
          </Route>
          <Route path="/clients">
            <Clients />
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
          <Route path="/editProducType">
            <ProductTypeDetails />
          </Route>
          <Route path="/programWeeklyList">
            <ProgramWeeklyList />
          </Route>
          <Route path="/newprogramweekly">
            <NewProgramWeekly />
          </Route>
          <Route path="/suivie">
            <Suivie />
          </Route>
          <Route path="/ravitailleur/suivie/:id">
            <SuivieProgrammePage />
          </Route>
          <Route path="/ravitailleur/programme/suivie/:idProgramme">
            <SuivieHistory />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
