import {
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
  } from "@material-ui/icons";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import "./user.css";
import { updateRavitailleurStore } from "../../app/applicationStates";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { useEffect, useState } from "react";
import { getRavitailleur, updateRavitailleur} from "./action";

  const key = updateRavitailleurStore;

  export default function Ravitailleur() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const ravitailleurUpdate = useSelector((state) => state?.[updateRavitailleurStore]) || initialState;

    const { ravitailleurId } = useParams();

    const [username, setUsername] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");

    useEffect(() => {
      setNom(ravitailleurUpdate?.data?.nom);
      setUsername(ravitailleurUpdate?.data?.username);
      setPrenom(ravitailleurUpdate?.data?.prenom);
      setEmail(ravitailleurUpdate?.data?.email);
      setTelephone(ravitailleurUpdate?.data?.telephone);
    }, [ravitailleurUpdate?.data]);

    console.log(ravitailleurUpdate?.data?.nom);
    console.log(ravitailleurUpdate?.data?.prenom);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateRavitailleur({
        username: ravitailleurUpdate?.data?.username,
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: telephone
      }));

      setTimeout(() => {
        navigate(-1);
      }, 500);
    };

    useEffect(() => {
      dispatch(getRavitailleur(ravitailleurId));
    }, []);

    return (
      <div className="user">

      {ravitailleurUpdate?.data?.loading && <Loader />}
      {ravitailleurUpdate?.data?.success && <AlertPopup type="success" message="Ravitailleur updated" />}
      {ravitailleurUpdate?.data?.error && <AlertPopup type="error" message="a problem occured" />}

        <div>
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
  