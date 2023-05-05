import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const Item = styled(Paper)(({ theme }) => ({
	color: "dark",
	padding: theme.spacing(3),
	margin: theme.spacing(1),
	textAlign: "center",
	boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.6)",
	textDecoration: "none",
	display: "flex",
	justifyContent: "spacem-arr",
	alignItems: "center",
	background: "#C0DBD9",
}));

export default function RavCard({ item }) {
	return (
		<Grid item xs={4} key={item.idRavitailleur}>
			<Link
				to={"/ravitailleurSuivie/suivie/" + item.idRavitailleur}
				style={{ textDecoration: "none" }}>
				<Item>
					<Avatar sx={{ bgcolor: "teal", marginRight: "10px" }}>
						{item.username.charAt(0).toUpperCase()}
					</Avatar>
					<h4>{item.username}</h4>
				</Item>
			</Link>
		</Grid>
	);
}
