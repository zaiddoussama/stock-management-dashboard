import { PermIdentity } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { machineTypes } from "../../dummyData";
import "./machineDetails.css";
import reducer, { initialState } from "./reducer";
import { getMachinesStore } from "../../app/applicationStates";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function MachineDetailsContainer() {
const onClick = (event) => {
  event.preventDefault()
}

  const machineListData = useSelector((state) => state?.[getMachinesStore]) || {
    ...initialState,
    data: {},
  };
  const machineToUpdate = machineListData?.data?.filter(
    (machine) => machine?.idMachine === parseInt(window.location.href.split('/').at(-1))
  )?.[0];

  const [machineNumber, setMachineNumber] = useState(machineToUpdate?.numero);
  const [machineType, setMachineType] = useState(machineToUpdate?.typeMachine);

  console.log({
    code: machineType,
    label: machineTypes.filter((type) => type?.code === machineType)?.[0]
      ?.label,
  });
  return (
    <div className="machine">
      <div className="machineTitleContainer">
        <h1 className="machineTitle">Edit Machine</h1>
        <Link to="/machines/add">
          <button className="machineAddButton">Create</button>
        </Link>
      </div>
      <div className="machineContainer">
        <div className="machineShow">
          <div className="machineShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="machineShowImg"
            />
            <div className="machineShowTopTitle">
              <span className="machineShowUsername">Machine number</span>
              <span className="machineShowUserTitle">Type : A</span>
            </div>
          </div>
          <div className="machineShowBottom">
            <span className="machineShowTitle">Machine linked to clients</span>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
            <div className="machineShowInfo">
              <PermIdentity className="machineShowIcon" />
              <span className="machineShowInfoTitle">annabeck99</span>
            </div>
          </div>
        </div>
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
                  defaultValue={machineTypes.filter(
                    (type) => type?.code === machineType
                  )?.[0]?.label}
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
              <button className="machineUpdateButton" onClick={onClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
