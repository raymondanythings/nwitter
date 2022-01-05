import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
const RootRouter = ({ isLoggedIn, userObj, refreshWindow }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="" element={<Home userObj={userObj} />} />
              <Route
                path="profile"
                element={
                  <Profile userObj={userObj} refreshWindow={refreshWindow} />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default RootRouter;
