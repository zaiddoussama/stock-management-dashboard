import "./addMachine.css";


import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { addMachineStore } from "../../app/applicationStates";
import { machineTypes } from "../../dummyData";
import { addMachine } from "./action";
import reducer from "./reducer";
import saga from "./saga";
import { useState } from "react";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";

const key = addMachineStore;

export function AddMachine() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [machineNumber, setMachineNumber] = useState("");
  const [machineType, setMachineType] = useState("A");

  const machineAddOutput = useSelector((state) => state?.[key]);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(
      addMachine({
        numero: machineNumber,
        typeMachine: machineType,
      })
    );
  };

  return (
    <div className="newMachine">
      {machineAddOutput?.loading && <Loader />}
      {machineAddOutput?.success && (
        <AlertPopup type="success" message="machine added" />
      )}
      {machineAddOutput?.error && (
        <AlertPopup type="error" message="a problem occured" />
      )}

      <h1 className="newMachineTitle">New Machine</h1>
      <form className="newMachineForm">
        <div className="newMachineItem">
          <label>Machine number</label>
          <input
            type="text"
            onChange={(e) => setMachineNumber(e.target.value)}
          />
        </div>

        <div className="newMachineItem">
          <label>Machine type</label>
          <select
            onChange={(e) => setMachineType(e.target.value)}
            className="newMachineSelect"
            name="active"
            id="active"
          >
            {machineTypes.map((type, index) => (
              <option key={index} value={type?.code}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>
        <button className="newMachineButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
