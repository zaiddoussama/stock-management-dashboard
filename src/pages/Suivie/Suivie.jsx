import * as React from "react";
import "./Suivie.css";
import RavListContainer from "../../containers/SuivieRavitailleurs";


export default function Suivie() {
	return (
		<div className="suivie">
			<h4>La list des ravitailleurs</h4>
			<br />
			<RavListContainer />
		</div>
	);
}
