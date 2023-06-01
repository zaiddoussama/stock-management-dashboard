import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Switch, Route } from "react-router-dom";
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
import NewRavitailleur from "./containers/AddRavitailleur";
import NewRavitailleurContainer from "./pages/newRavitailleur/newRavitailleur";
import Ravitailleur from "./containers/EditRavitailleur";
import EditProgramWeekly from "./containers/EditProgramWeekly";

function App() {

  return (
    <Router history={history}>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />}>

          </Route>
          <Route exact path="/login" element={<Login />}>
            {/* <Login /> */}
          </Route>
          <Route path="/users" element={<UserList />}>
            {/* <UserList /> */}
          </Route>
          <Route path="/user/:userId" element={<User />}>
            {/* <User /> */}
          </Route>
          <Route path="/newUser" element={<NewUser />}>
            {/* <NewUser /> */}
          </Route>

          <Route path="/machines/add" exact element={<AddMachine />}>
            {/* <AddMachine /> */}
          </Route>
          <Route path="/machines/:idMachine" exact element={<MachineDetails />}>
            {/* <MachineDetails /> */}
          </Route>
          <Route path="/machines" element={<Machine />}>
            {/* <Machine /> */}
          </Route>


          <Route path="/clients/add" exact element={<AddClient />}>
            {/* <AddClient /> */}
          </Route>
          <Route path="/clients/:idClient" exact element={<ClientDetails />}>
            {/* <ClientDetails /> */}
          </Route>
          <Route path="/clients" element={<Clients />}>
            {/* <Clients /> */}
          </Route>


          <Route path="/products" element={<ProductList />}>
            {/* <ProductList /> */}
          </Route>
          <Route path="/product/:productId" element={<Product />}>
            {/* <Product /> */}
          </Route>
          <Route path="/newproduct" element={<NewProduct />}>
            {/* <NewProduct /> */}
          </Route>
          <Route path="/ravitailleurs" element={<RavitailleurList />}>
            {/* <RavitailleurList /> */}
          </Route>
          <Route path="/newRavitailleur" element={<NewRavitailleurContainer />}>
            {/* <NewRavitailleurContainer /> */}
          </Route>
          <Route path="/ravitailleur/:ravitailleurId" element={<Ravitailleur />}>
            {/* <Ravitailleur /> */}
          </Route>
          <Route path="/productType" element={<ProductTypeList />}>
            {/* <ProductTypeList /> */}
          </Route>
          <Route path="/newproductType" element={<NewProductType />}>
            {/* <NewProductType /> */}
          </Route>
          <Route path="/editProducType/:id" element={<ProductTypeDetails />}>
            {/* <ProductTypeDetails /> */}
          </Route>
          <Route path="/programWeeklyList" element={<ProgramWeeklyList />}>
            {/* <ProgramWeeklyList /> */}
          </Route>
          <Route path="/newprogramweekly" element={<NewProgramWeekly />}>
            {/* <NewProgramWeekly /> */}
          </Route>
          <Route path="/editProgramWeekly/:id" element={<EditProgramWeekly />}>
            {/* <EditProgramWeekly /> */}
          </Route>
          <Route path="/suivie" element={<Suivie />}>
            {/* <Suivie /> */}
          </Route>
          <Route path="/ravitailleurSuivie/suivie/:id" element={<SuivieProgrammePage />}>
            {/* <SuivieProgrammePage /> */}
          </Route>
          <Route path="/ravitailleurProg/programme/suivie/:idProgramme" element={<SuivieHistory />}>
            {/* <SuivieHistory /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
