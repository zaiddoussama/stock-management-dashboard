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
import history from "./app/history";

function App() {

  return (
    <Router history={history}>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />

          {/**Users */}
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />

          {/**Machine */}
          <Route path="/machines/add" exact element={<AddMachine />} />
          <Route path="/machines/:idMachine" exact element={<MachineDetails />} />
          <Route path="/machines" element={<Machine />} />

          {/**Client */}
          <Route path="/clients/add" exact element={<AddClient />} />
          <Route path="/clients/:idClient" exact element={<ClientDetails />} />
          <Route path="/clients" element={<Clients />} />

          {/**Products */}
          <Route path="/products" exact element={<ProductList />} />
          <Route path="/product/:productId" exact element={<Product />} />
          <Route path="/newproduct" exact element={<NewProduct />} />

          {/**Ravitailleur */}
          <Route path="/ravitailleurs" element={<RavitailleurList />} />
          <Route path="/newRavitailleur" element={<NewRavitailleurContainer />} />
          <Route path="/ravitailleur/:ravitailleurId" element={<Ravitailleur />} />

          {/**Product Type */}
          <Route path="/productType" element={<ProductTypeList />} />
          <Route path="/newproductType" element={<NewProductType />} />
          <Route path="/editProducType/:id" element={<ProductTypeDetails />} />

          {/**Program */}
          <Route path="/programWeeklyList" element={<ProgramWeeklyList />} />
          <Route path="/newprogramweekly" element={<NewProgramWeekly />} />
          <Route path="/editProgramWeekly/:id" element={<EditProgramWeekly />} />

          {/**Suivie */}
          <Route path="/suivie" element={<Suivie />} />
          <Route path="/ravitailleurSuivie/suivie/:id" element={<SuivieProgrammePage />} />
          <Route path="/ravitailleurProg/programme/suivie/:idProgramme" element={<SuivieHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
