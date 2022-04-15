import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import auth from "../../Firebase/Firebase.init";
import useFirebase from "../Hooks/useFirebase";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

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
  const [hooksUser, hookslLading, hooksError] = useAuthState(auth);
  const [info, setInfo] = useState({ emails: "", passwords: "" });
  const [errors, setErrors] = useState({ emails: "", passwords: "", general: "" });
  const [createUserWithEmailAndPassword, users, loadings, hooksErrors] =
    useCreateUserWithEmailAndPassword(auth);

  const handleEmail = (emailInput) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setInfo({ ...info, email: emailInput });
      setErrors({ ...errors, emails: "" });
    } else {
      setErrors({ ...errors, emails: "Invalid email......." });
      setInfo({ ...info, email: "" });
    }
  };

  const handlePassword = (passwordInput) => {
    if (/(?=.*?[#?!@$%^&*-])/.test(passwordInput)) {
      setInfo({ ...info, passwords: passwordInput });
      setErrors({ ...errors, passwords: "" });
    } else {
      setErrors({
        ...errors,
        passwords: "At least one special character......",
      });
      setInfo({ ...info, passwords: "" });
    }
  };

  useEffect(() => {
    setErrors({ ...errors, general: hooksError?.message });
  }, [hooksError]);

  const handleWithCreateEmailPassword = (e) => {
    if (info.passwords === confirmPassword) {
      handleCreateWithPassword(info.emails, info.passwords);
    } else {
      setPasswordError("your password not match");
      setLoading(false);
    }
    e.preventDefault();
  };
  if (hooksUser) {
    navigate(from, { replace: true });
  }
  // if (error.includes("email-already-in-use")) {
  //   toast.error("already exist", { id: "user1" });
  // }

  /* const handleEmail = (emailInput) => {
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
  if (error.includes("email-already-in-use")) {
    toast.error("already exist", { id: "user1" });
  } */

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
            {errors?.emails && <span style={{ color: "red" }}>{errors?.emails}</span>}
            {/* {email?.errors && <span style={{ color: "red" }}>{email.errors}</span>} */}
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
            {errors?.passwords && <span style={{ color: "red" }}>{errors?.passwords}</span>}
            {errors?.general && <span style={{ color: "red" }}>{errors?.general}</span>}
            {/* {password?.errors && <span style={{ color: "red" }}>{password.errors}</span>} */}
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
          <span style={{ color: "red" }}>{passwordError}</span>
          {error && <span style={{ color: "red" }}>{error}</span>}
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
