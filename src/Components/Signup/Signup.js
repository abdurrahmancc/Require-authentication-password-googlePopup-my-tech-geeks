import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import useFirebase from "../Hooks/useFirebase";

const Signup = () => {
  const {
    handleGooglesignInWithPopup,
    handleCreateWithPassword,
    loading,
    setLoading,
    error,
    user,
  } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const from = location?.state?.from?.pathname || "/";
  const [email, setEmail] = useState({ value: "", errors: "" });
  const [password, setPassword] = useState({ value: "", errors: "" });

  const handleEmail = (emailInput) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmail({ value: emailInput, errors: "" });
    } else {
      setEmail({ value: "", errors: "Invalid email" });
    }
  };

  const handlePassword = (passwordInput) => {
    if (/(?=.*?[#?!@$%^&*-])/.test(passwordInput)) {
      setPassword({ value: passwordInput, errors: "" });
    } else {
      setPassword({
        value: "",
        errors: "At least one special character",
      });
    }
  };

  const handleWithCreateEmailPassword = (e) => {
    if (password.value === confirmPassword) {
      handleCreateWithPassword(email.value, password.value);
    } else {
      setPasswordError("your password not match");
      setLoading(false);
    }
    e.preventDefault();
  };
  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleWithCreateEmailPassword}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                onBlur={(e) => handleEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {email?.errors && <span>{email.errors}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                onBlur={(e) => handlePassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                required
              />
            </div>
            {password?.errors && <span>{password.errors}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                onBlur={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="confirmPassword"
                id="confirm-password"
                required
              />
            </div>
          </div>
          {loading && <span>Loadding...</span>}
          <span>{passwordError}</span>
          {error && <span>{error}</span>}
          <button onClick={() => setLoading(true)} type="submit" className="auth-form-submit">
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
          <button onClick={() => handleGooglesignInWithPopup()} className="google-auth">
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
