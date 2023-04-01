import React, { useState } from "react";
import { logOut } from "../../services/auth/authService";
import "./profile.css";

const items = [
  {
    label: "Profile",
    location: "/profile",
    onClick: () => console.log(this)
  },
  {
    label: "Logout",
    location: "/logout",
    onClick: () => logOut()
  },
];
function Profile() {
const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => setShowPopup(!showPopup)

  return (
    <div className="profileGlobalContainer">
      <img
        src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt="profile"
        className="topAvatar"
        onClick={handlePopup}
      />
      <div className={`profileContainer ${!showPopup && 'hideProfile'}`}>
        {items.map((item) => (
          <div className="profileItem" onClick={item?.onClick}>{item?.label}</div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
