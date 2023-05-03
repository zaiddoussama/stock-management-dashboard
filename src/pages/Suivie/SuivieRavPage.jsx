import React from "react";
import "./Suivie.css";
import { useParams } from "react-router-dom";
import Tracker from "../../components/Tracker/Tracker";

const SuivieRavPage = () => {
	return (
		<div className="suivie">
			<Tracker />
		</div>
	);
};

export default SuivieRavPage;
