import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";
import "../css/Contacts.css";

export default function Contacts() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="ff-home">
    
      <div className="ff-topbar">
        <div className="ff-container ff-topbar-inner">
          <button className="ff-burger" aria-label="Toggle menu" onClick={()=>setOpenNav(v=>!v)}>
            <span/><span/><span/>
          </button>
          <ul className={`ff-nav ${openNav ? "is-open" : ""}`}>
            <li onClick={()=>setOpenNav(false)}><Link to="/">HOME</Link></li>
            <li onClick={()=>setOpenNav(false)}><Link to="/account">MY ACCOUNT</Link></li>
            <li><Link to="/supplements">PRODUCTS</Link></li>
            <li onClick={()=>setOpenNav(false)}><Link to="/checkout">CHECKOUT</Link></li>
            <li onClick={()=>setOpenNav(false)}><Link className="is-active" to="/contacts">CONTACTS</Link></li>
          </ul>
        </div>
      </div>

      <header className="ff-header ff-container">
        <img className="ff-logo" src="/assets/logo.png" alt="Flex & Fuel" />
        <div className="ff-search">
          <input type="text" placeholder="Search..." />
          <button type="button" className="ff-icon" aria-label="Search">
            <img src="/assets/searchButton.png" alt="" className="ff-icon-img" /></button>
          <button type="button" className="ff-icon" aria-label="Cart" onClick={() => navigate("/checkout")}>
          <img src="/assets/cartButton.png" alt="" className="ff-icon-img" /></button>
        </div>
      </header>

  
      <section className="ct-hero">
        <img src="/assets/bgContact.png" alt="Contact Flex & Fuel" />
        <h1>CONTACT US</h1>
      </section>
     
      <section className="ff-container ct-grid">
        <form className="ct-card" onSubmit={(e)=>e.preventDefault()}>
          <div className="ct-card-head">Get in Touch</div>

          <label className="ct-field">
            <span>Name:</span>
            <input type="text" placeholder="Your Name" required />
          </label>

          <label className="ct-field">
            <span>Email:</span>
            <input type="email" placeholder="example@email.com" required />
          </label>

          <label className="ct-field">
            <span>Subject:</span>
            <input type="text" placeholder="Title..." />
          </label>

          <label className="ct-field">
            <span>Message:</span>
            <textarea rows="4" placeholder="Type here..." />
          </label>

          <button className="ct-btn" type="submit">SEND MESSAGE</button>
        </form>
        <div className="ct-about">
          <h3 className="ct-about-title">ABOUT <span>US</span></h3>
          <p>
            Welcome to Flex &amp; Fuel, your one-stop shop for gym wear,
            supplements, and fitness equipment in the Philippines. We bring you
            quality and affordable products to keep you strong, confident, and
            fueled on your fitness journey.
          </p>
          <p>
            If you have any questions or need assistance, please don’t hesitate
            to contact us through the platforms below. We’re here to help!
          </p>

          <div className="ct-contacts">
            <div className="ct-contact">
              <div className="ct-ico">📞</div>
              <div>
                <div className="ct-label">Phone Number</div>
                <div className="ct-value">0999 999 9999</div>
              </div>
            </div>

            <div className="ct-contact">
              <div className="ct-ico">✉️</div>
              <div>
                <div className="ct-label">Email</div>
                <div className="ct-value">Flex&Fuel@gmail.com</div>
              </div>
            </div>

            <div className="ct-contact">
              <div className="ct-ico">💬</div>
              <div>
                <div className="ct-label">WhatsApp</div>
                <div className="ct-value">0999 999 9999</div>
              </div>
            </div>

            <div className="ct-contact">
              <div className="ct-ico">📍</div>
              <div>
                <div className="ct-label">Location</div>
                <div className="ct-value">Parañaque City</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ct-cta">
        <img src="/assets/bgContact.png" alt="Fuel your strength" />
        <div className="ct-cta-overlay" />
        <div className="ct-cta-inner ff-container">
          <h2>Fuel your strength, flex your lifestyle</h2>
          <button className="ff-btn solid" onClick={()=>navigate("/signup")}>GET STARTED</button>
        </div>
      </section>
    </div>
  );
}
