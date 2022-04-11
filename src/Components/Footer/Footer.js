import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="btn-container">
      <div className="btn-header">
        <button onClick={() => navigate(-1)} className="left-btn">
          Left
        </button>
        <button onClick={() => navigate(1)} className="right-btn">
          Right
        </button>
      </div>
    </div>
  );
};

export default Footer;
