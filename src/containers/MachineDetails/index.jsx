import { Link } from "react-router-dom";
import { useInjectReducer } from "./../../app/injectReducer";
import { useInjectSaga } from "./../../app/injectSaga";
import { machineTypes } from "../../dummyData";
import saga from "./saga";
import "./machineDetails.css";
import reducer, { initialState } from "./reducer";
import {
  getMachinesStore,
  updateMachineStore,
} from "../../app/applicationStates";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateMachine } from "./action";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";

const key = updateMachineStore;

export default function MachineDetailsContainer() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  const onClick = (event) => {
    event.preventDefault();
    dispatch(updateMachine({
      idMachine: parseInt(window.location.href.split("/").at(-1)),
      typeMachine: machineType,
      numero: machineNumber
    }))
  };

  const machineUpdate =  useSelector((state) => state?.[updateMachineStore]) || initialState;
  const machineListData = useSelector((state) => state?.[getMachinesStore]) || {
    ...initialState,
    data: {},
  };
  const machineToUpdate = machineListData?.data?.filter(
    (machine) =>
      machine?.idMachine === parseInt(window.location.href.split("/").at(-1))
  )?.[0];

  const [machineNumber, setMachineNumber] = useState(machineToUpdate?.numero);
  const [machineType, setMachineType] = useState(machineToUpdate?.typeMachine);

  return (
    <div className="machine">
      {machineUpdate?.loading && <Loader/>}
      {machineUpdate?.success && <AlertPopup type="success" message="machine updated"/>}
      {machineUpdate?.error && <AlertPopup type="error" message="a problem occured"/>}
      <div className="machineTitleContainer">
        <h1 className="machineTitle">Edit Machine</h1>
        <Link to="/machines/add">
          <button className="machineAddButton">Create</button>
        </Link>
      </div>
      <div className="machineContainer">
        <div className="machineUpdate">
          <span className="machineUpdateTitle">Edit</span>
          <form className="machineUpdateForm">
            <div className="machineUpdateLeft">
              <div className="machineUpdateItem">
                <label>Machine number</label>
                <input
                  value={machineNumber}
                  onChange={(e) => setMachineNumber(e.target.value)}
                  type="text"
                  className="machineUpdateInput"
                />
              </div>
              <div className="machineUpdateItem">
                <label>Machine Type</label>
                <select
                  defaultValue={
                    machineTypes.filter(
                      (type) => type?.code === machineType
                    )?.[0]?.label
                  }
                  onChange={(e) => setMachineType(e.target.value)}
                  className="machineUpdateSelect"
                  name="machineType"
                  id="machineType"
                >
                  {machineTypes.map((type, index) => (
                    <option key={index} value={type?.code}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="machineUpdateRight">
              <button className="machineUpdateButton" onClick={onClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
