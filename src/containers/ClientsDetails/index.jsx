import { Link } from "react-router-dom";
import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import "./clientDetails.css";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { updateClientStore } from "../../app/applicationStates";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAvailableMachines } from "../AddClient/action";
import { getClient, updateClient } from "./action";

const key = updateClientStore;

export default function ClientDetailsContainer() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientMachines, setClientMachines] = useState([]);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [image, setImage] = useState(null);

  const updateClientOutput = useSelector((state) => state?.[updateClientStore]) || initialState;

  const onClick = (event) => {
    event.preventDefault();
    dispatch(updateClient({
      nom: clientName,
      adress: clientAddress,
      image: image,
      machines: selectedMachines
    }))
  }

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSelectChange = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push({idMachine: options[i].value});
      }
    }
    setSelectedMachines(value);
  };

  useEffect(() => {
    dispatch(getClient(parseInt(window.location.href.split("/").at(-1))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getAvailableMachines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setClientAddress(updateClientOutput?.currentClient?.data?.adress || "");
    setClientMachines(updateClientOutput?.currentClient?.data?.machines || []);
    setClientName(updateClientOutput?.currentClient?.data?.nom || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateClientOutput?.currentClient]);


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
                <label>Client Machines</label>
                <select
                  onChange={handleSelectChange}
                  className="clientUpdateSelect"
                  name="clientMachines"
                  id="clientMachines"
                  multiple
                >
                  {updateClientOutput?.machines?.data.map((machine, index) => (
                    <option
                      selected={clientMachines
                        .map((m) => m?.idMachine)
                        .includes(machine?.idMachine)}
                      key={index}
                      value={machine?.idMachine}
                    >
                      {machine?.numero}
                    </option>
                  ))}
                </select>
              </div>
              <div className="clientUpdateItem">
                <input type="file" onChange={onFileChange} />
              </div>
            </div>
            <div className="clientUpdateRight">
              <button className="clientUpdateButton" onClick={onClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
