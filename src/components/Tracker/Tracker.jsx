import React from "react";
import "./Tracker.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Tracker = ({ history }) => {
	return (
		<ul className="events">
			{history?.length > 0 &&
				history?.map((item, index) => (
					<li key={index}>
						<time>
							<AccessTimeIcon />
							<i>{item?.date?.split("T")[1].split(".")[0] + " / " + item?.date?.split("T")[0]}</i>
						</time>
						{item.machineOrStock == "MACHINE" ? (
							<>
								<span style={{ color: "green" }}>
									<strong>{item.machineOrStock}</strong>
									<i>{item.deposerCharger}</i>
									<br />
									<small>
										Machine : {item.machine.numero}
										<br />
										Client : {item.client?.nom} <br />
										Produit : {item.produit?.nom} <br />
										Quantite : {item.quantite}{" "}
									</small>
									<br />
								</span>
							</>
						) : (
							<>
								<span style={{ color: "blue" }}>
									<strong>{item.machineOrStock}</strong>
									<i>{item.deposerCharger}</i>
									<br />
									<small>
										Produit : {item.produit?.nom} <br />
										Quantite : {item.quantite}{" "}
									</small>
								</span>
							</>
						)}
					</li>
				))}
		</ul>
	);
};

export default Tracker;
