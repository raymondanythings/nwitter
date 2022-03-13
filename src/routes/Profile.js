import { authService } from "fBase";
import { signOut, updateProfile } from "firebase/auth";
import useTitle from "Hooks/useTitle";
import React, { useState } from "react";

const Profile = ({ userObj, refreshWindow }) => {
  const setTitle = useTitle("Profile");
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    signOut(authService);
    setTitle("Login");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    refreshWindow();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          autoFocus
          placeholder="Display Name"
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
