import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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

export default function ProgramCard({ item }) {
	return (
		<Grid item xs={4} key={item.idProgrammeWeekly}>
			<Link
				to={"/ravitailleurProg/programme/suivie/" + item.idProgrammeWeekly}
				style={{ textDecoration: "none" }}>
				<Item>
					<CalendarTodayIcon sx={{ marginRight: "10px" }} />
					<h4>{item.dateDebutProgramme}</h4>
				</Item>
			</Link>
		</Grid>
	);
}
