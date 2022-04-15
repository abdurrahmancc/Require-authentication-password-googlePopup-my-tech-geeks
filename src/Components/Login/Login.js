import React, { useState } from "react";
import "./AuthForm.css";
import GoogleLogo from "../../Assets/Image/google.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import useFirebase from "../Hooks/useFirebase";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const {
    handleGooglesignInWithPopup,
    handleWithPassword,
    user,
    setUser,
    error,
    loading,
    handleForgatePassword,
    setLoading,
  } = useFirebase();

  const from = location?.state?.from?.pathname || "/";

  const handlewithLogInUser = (e) => {
    handleWithPassword(email, password);
    e.preventDefault();
  };

  if (user) {
    navigate(from, { replace: true });
  }
  if (error) {
    toast.error("error!", { id: "test-1" });
  }
  if (loading) {
    toast.loading("Loading...", { id: "loading1" });
  }
  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Login</h1>
        <form onSubmit={handlewithLogInUser}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input onBlur={(e) => setEmail(e.target.value)} type="text" name="email" id="email" />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                onBlur={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
              />
            </div>
          </div>
          {loading && <span>Loading...</span>}

          {error && <span>{error}</span>}

          <button onClick={() => setLoading(true)} type="submit" className="auth-form-submit">
            Login
          </button>
        </form>
        <a style={{ marginTop: "10px" }} onClick={() => handleForgatePassword(email)} href="">
          Forget Password?
        </a>
        <p className="redirect">
          New to Tech Geeks? <span onClick={() => navigate("/signup")}>Create New Account</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button onClick={() => handleGooglesignInWithPopup()} className="google-auth">
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
