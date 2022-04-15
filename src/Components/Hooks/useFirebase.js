import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";
const GoogleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleCreateWithPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // navigate(from, { replace: true });
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("hello");
        });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleGooglesignInWithPopup = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        setUser(result.user);
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const handleWithPassword = (email, password) => {
    // console.log("40 page", email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success("Successfully created!", { id: "successFull" });

        // navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false), toast.dismiss());
  };

  const handleWithLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("hello hi by by");
      })
      .catch((error) => {
        // setError(error);
      });
  };
  const handleForgatePassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };

  return {
    user,
    setUser,
    error,
    handleGooglesignInWithPopup,
    handleCreateWithPassword,
    handleWithPassword,
    handleWithLogOut,
    loading,
    setLoading,
    handleForgatePassword,
  };
};

export default useFirebase;
