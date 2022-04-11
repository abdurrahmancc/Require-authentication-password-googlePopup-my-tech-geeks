import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import useFirebase from "../Hooks/useFirebase";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { handleCreateWithPassword } = useFirebase();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleWithCreateEmailPassword = (e) => {
    if (password === confirmPassword) {
      handleCreateWithPassword(email, password);
    } else {
      setError("your password not match");
    }
    e.preventDefault();
  };

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleWithCreateEmailPassword}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                onBlur={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
              />
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
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                onBlur={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="confirmPassword"
                id="confirm-password"
              />
            </div>
          </div>
          <span>{error}</span>
          <button type="submit" className="auth-form-submit">
            Sign Up
          </button>
        </form>
        <p className="redirect">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button className="google-auth">
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
