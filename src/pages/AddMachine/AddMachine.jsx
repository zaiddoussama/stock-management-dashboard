import { machineTypes } from "../../dummyData";
import "./addMachine.css";

export default function AddMachine() {
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
        <button className="newMachineButton">Create</button>
      </form>
    </div>
  );
}
