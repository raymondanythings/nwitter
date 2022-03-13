import { useEffect, useState } from "react";
import RootRouter from "components/Router";
import { authService } from "fBase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";
import useTitle from "Hooks/useTitle";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const setTitle = useTitle("Login");
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshWindow = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        updateProfile(user, { displayName: user.displayName }),
    });
  };
  return (
    <>
      {init ? (
        <RootRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshWindow={refreshWindow}
        />
      ) : (
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ClipLoader color="#04AAFF" size={50} />
        </div>
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
