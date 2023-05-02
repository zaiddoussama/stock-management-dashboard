import { useState } from "react";
import { getUsersStore } from "../../app/applicationStates";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import "./newRavitailleur.css";
import reducer from "./reducer";
import saga from "./saga";
import { useDispatch, useSelector } from "react-redux";
import { addRavitailleur } from "./action";
import { Alert, CircularProgress, Stack } from "@mui/material";

const key = getUsersStore;

export default function NewRavitailleur() {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");

  const userAddOutput = useSelector((state) => state?.[key]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addRavitailleur({
        username: username,
        nom: name,
        prenom: lastName,
        email: email,
        password: password,
        telephone: telephone,
      })
    );
  };

  return (
    <div className="newUser">

      {userAddOutput?.loading && <CircularProgress />}
      {userAddOutput?.error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">a problem occured, try again !</Alert>
        </Stack>
      )}
      {userAddOutput?.success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Ravitailleur added successfully !</Alert>
        </Stack>
      )}

      <h1 className="newUserTitle">New Ravitailleur</h1>

      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>First Name</label>
          <input type="text" placeholder="First Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+212 " onChange={(e) => { setTelephone(e.target.value) }} />
        </div>
        <button className="newUserButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
