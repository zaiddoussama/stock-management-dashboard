import { PermIdentity } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { clientMachiness } from "../../dummyData";
import "./clientDetails.css";
import reducer, { initialState } from "./reducer";
import { addClientStore, getClientsStore } from "../../app/applicationStates";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAvailableMachines } from "../AddClient/action";

export default function ClientDetailsContainer() {
  const dispatch = useDispatch();
  const availableMachines = useSelector((state) => state?.[addClientStore]) || [];
  const clientListData = useSelector((state) => state?.[getClientsStore]) || {
    ...initialState,
    data: {},
  };
  const clientToUpdate = clientListData?.data?.filter(
    (client) => client?.idClient === parseInt(window.location.href.split('/').at(-1))
  )?.[0];

  console.log(availableMachines)

  const [clientName, setClientName] = useState(clientToUpdate?.nom);
  const [clientAddress, setClientAddress] = useState(clientToUpdate?.adress);
  const [clientMachines, setClientMachines] = useState(clientToUpdate?.machines);

  useEffect(() => {
    dispatch(getAvailableMachines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="client">
      <div className="clientTitleContainer">
        <h1 className="clientTitle">Edit Client</h1>
        <Link to="/clients/add">
          <button className="clientAddButton">Create</button>
        </Link>
      </div>
      <div className="clientContainer">

        <div className="clientUpdate">
          <span className="clientUpdateTitle">Edit</span>
          <form className="clientUpdateForm">
            <div className="clientUpdateLeft">
              <div className="clientUpdateItem">
                <label>Client name</label>
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  type="text"
                  className="clientUpdateInput"
                />
              </div>
              <div className="clientUpdateItem">
                <label>Client address</label>
                <input
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  type="text"
                  className="clientUpdateInput"
                />
              </div>
              <div className="clientUpdateItem">
                <label>Client Type</label>
                <select

                  onChange={(e) => setClientMachines(e.target.value)}
                  className="clientUpdateSelect"
                  name="clientMachines"
                  id="clientMachines"
                  multiple
                >
                  {[].map((type, index) => (
                    <option key={index} value={type?.code}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="clientUpdateRight">
              <button className="clientUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
