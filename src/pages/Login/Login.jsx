import React, { useState } from "react";
import { logIn } from "../../services/auth/authService";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import './Login.css';

function Login({ config }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const { username, password } = formData;

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = e => {
		e.preventDefault();

		const payload = {
			username,
			password,
		};

		logIn(payload, config, setLoading, setError)
	};

	return (
		<>
			<div className="login">
				<div className="login-container">
					<img src={require("../../assets/pushLogo.png")} />
					<form className="login-form" onSubmit={onSubmit}>
						<div className="textfield">
							<TextField
								id="textfield-username"
								label="Username"
								name="username"
								variant="standard"
								value={username}
								onChange={onChange}
								InputProps={{
									startAdornment: <PersonIcon />,
								}}
							/>
						</div>
						<div className="textfield">
							<TextField
								label="Password"
								name="password"
								variant="standard"
								value={password}
								onChange={onChange}
								type={showPassword ? "text" : "password"}
								InputProps={{
									startAdornment: <LockIcon />,
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</div>
						<Button
							type="submit"
							variant="contained"
							sx={{
								background: "rgb(75,174,243)",
								background:
									"radial-gradient(circle, rgba(75,174,243,0.9921218487394958) 0%, rgba(5,111,238,1) 100%)",
							}}>
							Login
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;