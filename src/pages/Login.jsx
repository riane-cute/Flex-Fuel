// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";     // topbar + header
import "../css/Signup.css";   // reuse same theme styles (su-*)

export default function Login() {
  const [openNav, setOpenNav] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate("/"); 
  };

  return (
    <div className="ff-home">
      <section className="su-hero">
        <div className="ff-container su-hero-inner">
          <img className="su-hero-logo" src="/assets/logo.png" alt="Flex & Fuel" />
          <h1>Welcome back</h1>
          <p>Log in to continue your training journey.</p>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <main className="ff-container su-wrap">
        <form className="su-card" onSubmit={handleSubmit}>
          <div className="su-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="su-field su-has-icon">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              minLength={6}
              required
            />
            <button type="button" className="su-eye" onClick={() => setShowPw(v => !v)} aria-label="Toggle password visibility">
          <img src={showPw ? process.env.PUBLIC_URL + "/assets/hide.png" : process.env.PUBLIC_URL + "/assets/eye.png"} alt="Toggle password"/></button>
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"6px 0 10px"}}>
            <label className="su-check" style={{margin:0}}>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot" className="su-link">Forgot password?</Link>
          </div>

          <button className="su-btn" type="submit">LOG IN</button>

          <p className="su-small">
            Don’t have an account? <Link to="/signup" className="su-link">Sign up</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
