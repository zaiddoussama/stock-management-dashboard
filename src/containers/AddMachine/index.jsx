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

const key = addMachineStore;

export function AddMachine() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const machineAddOutput = useSelector(state => state?.[key]);
  console.log(machineAddOutput)
  const dispatch = useDispatch();


  const handleClick = () => {
    dispatch(addMachine({
      numero: "1154",
      typeMachine : "A"
  }));
  }

  return (
    <div className="newMachine">
      <h1 className="newMachineTitle">New Machine</h1>
      <form className="newMachineForm">
        <div className="newMachineItem">
          <label>Machine number</label>
          <input type="text" />
        </div>

        <div className="newMachineItem">
          <label>Machine type</label>
          <select className="newMachineSelect" name="active" id="active">
            {machineTypes.map((type, index) => (
              <option key={index} value={type}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>
        <button className="newMachineButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
