import {
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
  } from "@material-ui/icons";
  import { Link, useParams } from "react-router-dom";
  import "./user.css";
import { getUsersStore, updateUserStore } from "../../app/applicationStates";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { useState } from "react";
import { updateUser } from "./action";

  const key = updateUserStore;

  export default function User() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });
  
    const dispatch = useDispatch();
  
    const userUpdate = useSelector((state) => state?.[updateUserStore]) || initialState;
    const userListData = useSelector((state) => state?.[getUsersStore]) || {
      ...initialState,
      data: {},
    };

    console.log(userUpdate);

    console.log("userListData before");

    console.log(userListData);

    console.log("userListData after");

    const {userId} = useParams();

    console.log(userId);
    
    const userToUpdate = userListData?.data?.filter(
      (user) =>
        user?.username === window.location.href.split("/").pop()
    )?.[0];
  
    console.log("userToUpdate before");
    console.log(userToUpdate);
    console.log("userToUpdate after");

    const [username, setusername] = useState(userToUpdate?.username);
    const [nom, setNom] = useState(userToUpdate?.nom);
    const [prenom, setPrenom] = useState(userToUpdate?.prenom);
    const [email, setEmail] = useState(userToUpdate?.email);
    const [telephone, setTelephone] = useState(userToUpdate?.telephone);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateUser({
        username: window.location.href.split("/").pop(),
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: telephone
      }))
    };

    return (
      <div className="user">

      {userUpdate?.loading && <Loader />}
      {userUpdate?.success && <AlertPopup type="success" message="Admin updated" />}
      {userUpdate?.error && <AlertPopup type="error" message="a problem occured" />}

        <div>
          <h1 className="userTitle">Edit Admin</h1>
          <Link to="/newUser">
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
  