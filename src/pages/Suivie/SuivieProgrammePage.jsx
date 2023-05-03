import React from "react";
import ProgramListContainer from "../../containers/SuivieProgrammes";
import "./Suivie.css";

const SuivieProgrammePage = () => {
	return (
		<div className="suivie">
			<h4>La list des programmes</h4>
			<br />
			<ProgramListContainer />
		</div>
	);
};

export default SuivieProgrammePage;
