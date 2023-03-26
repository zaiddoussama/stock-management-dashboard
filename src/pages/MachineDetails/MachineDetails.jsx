import {
  PermIdentity,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { machineTypes } from "../../dummyData";
import "./machineDetails.css";

export default function MachineDetails() {
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
                <input type="text" className="machineUpdateInput" />
              </div>
              <div className="machineUpdateItem">
                <label>Machine Type</label>
                <select className="machineUpdateSelect" name="machineType" id="machineType">
                  {machineTypes.map((type, index) => (
                    <option className="selectItem" key={index} value={type}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="machineUpdateRight">
              <button className="machineUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
