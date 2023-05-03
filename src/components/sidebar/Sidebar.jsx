import "./sidebar.css";
import {
	LineStyle,
	Timeline,
	TrendingUp,
	PermIdentity,
	Storefront,
	MailOutline,
	DynamicFeed,
	ChatBubbleOutline,
	WorkOutline,
	Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Quick Menu</h3>
					<ul className="sidebarList">
						<Link to="/users" className="link">
							<li className="sidebarListItem">
								<PermIdentity className="sidebarIcon" />
								Admins
							</li>
						</Link>
						<Link to="/ravitailleurs" className="link">
							<li className="sidebarListItem">
								<PermIdentity className="sidebarIcon" />
								Ravitailleurs
							</li>
						</Link>
						<Link to="/programWeeklyList" className="link">
							<li className="sidebarListItem">
								<WorkOutline className="sidebarIcon" />
								Program weekly
							</li>
						</Link>
						<Link to="/machines" className="link">
							<li className="sidebarListItem">
								<Storefront className="sidebarIcon" />
								Machines
							</li>
						</Link>
						<Link to="/clients" className="link">
							<li className="sidebarListItem">
								<PermIdentity className="sidebarIcon" />
								Clients
							</li>
						</Link>
						<Link to="/products" className="link">
							<li className="sidebarListItem">
								<Storefront className="sidebarIcon" />
								Products
							</li>
						</Link>
						<Link to="/productType" className="link">
							<li className="sidebarListItem">
								<Storefront className="sidebarIcon" />
								Product Type
							</li>
						</Link>
						<h3 className="sidebarTitle">Analytics</h3>
						<Link to="/suivie" className="link">
							<li className="sidebarListItem">
								<QueryStatsIcon className="sidebarIcon" />
								Suivie
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
}
