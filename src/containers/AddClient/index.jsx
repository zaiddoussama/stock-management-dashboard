import "./addClient.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { addClientStore } from "../../app/applicationStates";
import { addClient, getAvailableMachines } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";

const key = addClientStore;

export function AddClientContainer() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [clientMachines, setClientMachines] = useState([]);
  const [image, setImage] = useState(null);

  const clientAddOutput = useSelector((state) => state?.[key]) || initialState;

  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setClientMachines(value);
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(
      addClient({
        nom: name,
        adress: address,
        image: image,
        machines: clientMachines.map((id) => {
          return { idMachine: id };
        }),
      })
    );
  };

  useEffect(() => {
    dispatch(getAvailableMachines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="newClient">
      {(clientAddOutput?.machines?.loading ||
        clientAddOutput?.client?.loading) && <Loader />}
      {clientAddOutput?.client?.success && (
        <AlertPopup type="success" message="client added" />
      )}
      {(clientAddOutput?.machines?.error || clientAddOutput?.client?.error) && (
        <AlertPopup type="error" message="a problem occured" />
      )}

      <h1 className="newClientTitle">New Client</h1>
      <form className="newClientForm">
        <div className="newClientItem">
          <label>Client name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="newClientItem">
          <label>Client address</label>
          <input type="text" onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="newClientItem">
          <label>Client machines</label>
          <select
            onChange={handleSelectChange}
            className="newClientSelect"
            name="active"
            id="active"
            multiple
          >
            {clientAddOutput?.machines?.data.map((type, index) => (
              <option key={index} value={type?.idMachine}>
                {type?.numero}
              </option>
            ))}
          </select>
        </div>

        <div className="newClientItem">
          <input type="file" onChange={onFileChange} />
        </div>

        <button className="newClientButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
