import {
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  import "./user.css";
import { getRavitailleursStore, updateRavitailleurStore } from "../../app/applicationStates";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { useState } from "react";
import { updateRavitailleur} from "./action";

  const key = updateRavitailleurStore;

  export default function Ravitailleur() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });
  
    const dispatch = useDispatch();
  
    const ravitailleurUpdate = useSelector((state) => state?.[updateRavitailleurStore]) || initialState;
    const ravitailleurListData = useSelector((state) => state?.[getRavitailleursStore]) || {
      ...initialState,
      data: {},
    };
    
    const ravitailleurToUpdate = ravitailleurListData?.data?.filter(
      (ravitailleur) =>
      ravitailleur?.username === window.location.href.split("/").pop()
    )?.[0];

    const [username, setusername] = useState(ravitailleurToUpdate?.username);
    const [nom, setNom] = useState(ravitailleurToUpdate?.nom);
    const [prenom, setPrenom] = useState(ravitailleurToUpdate?.prenom);
    const [email, setEmail] = useState(ravitailleurToUpdate?.email);
    const [telephone, setTelephone] = useState(ravitailleurToUpdate?.telephone);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateRavitailleur({
        username: window.location.href.split("/").pop(),
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: telephone
      }))
    };

    return (
      <div className="user">

      {ravitailleurUpdate?.loading && <Loader />}
      {ravitailleurUpdate?.success && <AlertPopup type="success" message="Admin updated" />}
      {ravitailleurUpdate?.error && <AlertPopup type="error" message="a problem occured" />}

        <div className="userTitleContainer">
          <h1 className="userTitle">Edit Ravitailleur</h1>
          <Link to="/newRavitailleur">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{nom} {prenom}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{username}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{telephone}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">Voiture</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="username"
                    className="userUpdateInput"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Nom</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="userUpdateInput"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Prenom</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="userUpdateInput"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>email</label>
                  <input
                    type="text"
                    placeholder="exemple@gmail.com"
                    className="userUpdateInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Telephone</label>
                  <input
                    type="text"
                    placeholder="+212 00000000"
                    className="userUpdateInput"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  