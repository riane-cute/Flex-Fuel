import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";
import "../css/Signup.css";

export default function Signup() {
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [avatar, setAvatar] = useState(null); 
  const navigate = useNavigate();

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

   
    const user = {
      avatar: avatar || "",                     
      gender: fd.get("gender") || "",
      firstName: fd.get("firstname")?.trim() || "",
      lastName: fd.get("lastname")?.trim() || "",
      email: fd.get("email")?.trim() || "",
      phone: fd.get("phone")?.trim() || "",
      address: fd.get("address")?.trim() || "",
      birthdate: fd.get("birthdate") || "",
      postal: fd.get("postal")?.trim() || "",
    };

    localStorage.setItem("ff_user", JSON.stringify(user));
    navigate("/account");
  };

  return (
    <div className="ff-home">
    
      <section className="su-hero">
        <div className="ff-container su-hero-inner">
          <img className="su-hero-logo" src="/assets/logo.png" alt="Flex & Fuel"/>
          <div>
            <h1>Create your account</h1>
            <p>Join the Flex &amp; Fuel community — strong, stylish, and healthy.</p>
          </div>
        </div>
      </section>

      <main className="ff-container su-wrap">
        <form className="su-card" onSubmit={handleSubmit}>

          <div className="su-avatar">
            <div className="su-avatar-ring">
              <img
                src={avatar || "/assets/account/avatar-placeholder.jpg"}
                alt="Profile"
              />
            </div>
            <label className="su-upload">
              <input type="file" accept="image/*" onChange={handleAvatar} />
              Upload Photo
            </label>
          </div>

          <div className="su-gender">
            <label className="su-radio">
              <input type="radio" name="gender" value="male" /> Male
            </label>
            <label className="su-radio">
              <input type="radio" name="gender" value="female" /> Female
            </label>
          </div>

          <div className="su-row">
            <div className="su-field">
              <label htmlFor="firstname">First name</label>
              <input id="firstname" name="firstname" type="text" required />
            </div>
            <div className="su-field">
              <label htmlFor="lastname">Last name</label>
              <input id="lastname" name="lastname" type="text" required />
            </div>
          </div>

          <div className="su-row">
            <div className="su-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="su-field">
              <label htmlFor="phone">Phone #</label>
              <input id="phone" name="phone" type="tel" placeholder="" />
            </div>
          </div>

          <div className="su-field">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" type="text" placeholder="" />
          </div>

          <div className="su-row">
            <div className="su-field">
              <label htmlFor="birthdate">Birthdate</label>
              <input id="birthdate" name="birthdate" type="date" />
            </div>
            <div className="su-field">
              <label htmlFor="postal">Postal Code</label>
              <input id="postal" name="postal" type="text" />
            </div>
          </div>

          <div className="su-row">
            <div className="su-field su-has-icon">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                minLength={6}
                required
              />
              <button
                type="button"
                className="su-eye"
                onClick={()=>setShowPw(v=>!v)}
                aria-label="Toggle password visibility"
              >{showPw ? "🙈" : "👁️"}</button>
            </div>

            <div className="su-field su-has-icon">
              <label htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                name="confirm"
                type={showPw2 ? "text" : "password"}
                minLength={6}
                required
              />
              <button
                type="button"
                className="su-eye"
                onClick={()=>setShowPw2(v=>!v)}
                aria-label="Toggle confirm password visibility"
              >{showPw2 ? "🙈" : "👁️"}</button>
            </div>
          </div>

          <label className="su-check">
            <input type="checkbox" required />
            I agree to the <a href="/terms">Terms</a> &amp; <a href="/privacy">Privacy Policy</a>.
          </label>

          <button className="su-btn" type="submit">CREATE ACCOUNT</button>

          <p className="su-small">
            Already have an account? <Link to="/login" className="su-link">Log in</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
