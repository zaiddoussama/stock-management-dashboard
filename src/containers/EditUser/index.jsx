import { LocationSearching, MailOutline, PermIdentity, PhoneAndroid } from "@material-ui/icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./user.css";
import { getUserStore, updateUserStore } from "../../app/applicationStates";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { useState } from "react";
import { getUser, updateUser } from "./action";
import { useEffect } from "react";

const key = updateUserStore;

export default function User() {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userUpdate = useSelector(state => state?.[updateUserStore]) || initialState;

	const { userId } = useParams();

	const [username, setUsername] = useState("");
	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [email, setEmail] = useState("");
	const [telephone, setTelephone] = useState("");

	useEffect(() => {
		setNom(userUpdate?.data?.nom);
		setUsername(userUpdate?.data?.username);
		setPrenom(userUpdate?.data?.prenom);
		setEmail(userUpdate?.data?.email);
		setTelephone(userUpdate?.data?.telephone);
	}, [userUpdate?.data]);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(
			updateUser({
				username: userUpdate?.data?.username,
				nom: nom,
				prenom: prenom,
				email: email,
				telephone: telephone,
			})
		);

		setTimeout(() => {
			navigate(-1);
		}, 500);
	};

	useEffect(() => {
		dispatch(getUser(userId));
	}, []);

	return (
		<div className="user">
			{userUpdate?.data?.loading && <Loader />}
			{userUpdate?.data?.success && <AlertPopup type="success" message="Admin updated" />}
			{userUpdate?.data?.error && <AlertPopup type="error" message="a problem occured" />}

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
							<span className="userShowUsername">
								{nom} {prenom}
							</span>
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
									onInput={e => setNom(e.target.value)}
								/>
							</div>
							<div className="userUpdateItem">
								<label>Prenom</label>
								<input
									type="text"
									placeholder="Last name"
									className="userUpdateInput"
									value={prenom}
									onInput={e => setPrenom(e.target.value)}
								/>
							</div>
							<div className="userUpdateItem">
								<label>email</label>
								<input
									type="email"
									placeholder="exemple@gmail.com"
									className="userUpdateInput"
									value={email}
									onInput={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="userUpdateItem">
								<label>Telephone</label>
								<input
									type="tel"
									placeholder="+212 00000000"
									className="userUpdateInput"
									pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
									value={telephone}
									onInput={e => setTelephone(e.target.value)}
								/>
							</div>
						</div>
						<div className="userUpdateRight">
							<button className="userUpdateButton" onClick={handleSubmit}>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
