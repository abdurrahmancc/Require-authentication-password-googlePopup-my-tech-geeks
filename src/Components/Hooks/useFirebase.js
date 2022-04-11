import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";
const GoogleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleCreateWithPassword = (email, password) => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGooglesignInWithPopup = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        setUser(result.user);
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWithPassword = (email, password) => {
    // console.log("40 page", email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleWithLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("hello hi by by");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return {
    user,
    setUser,
    handleGooglesignInWithPopup,
    handleCreateWithPassword,
    handleWithPassword,
    handleWithLogOut,
  };
};

export default useFirebase;
