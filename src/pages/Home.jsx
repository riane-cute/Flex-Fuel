import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const bg = (path) => ({ backgroundImage: `url(${encodeURI(path)})` });

  return (
    <div className="ff-home">
 
      <div className="ff-topbar">
        <div className="ff-container ff-topbar-inner">
          <button
            className="ff-burger"
            aria-label="Toggle menu"
            onClick={() => setOpenNav((v) => !v)}
          >
            <span /><span /><span />
          </button>

          <ul className={`ff-nav ${openNav ? "is-open" : ""}`}>
            <li onClick={() => setOpenNav(false)}><Link to="/">HOME</Link></li>
            <li onClick={() => setOpenNav(false)}><Link to="/account">MY ACCOUNT</Link></li>
            <li onClick={() => setOpenNav(false)}><Link to="/equipments">PRODUCTS</Link></li>
            <li onClick={() => setOpenNav(false)}><Link to="/checkout">CHECKOUT</Link></li>
            <li onClick={() => setOpenNav(false)}><Link to="/contacts">CONTACTS</Link></li>
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


      <section className="ff-hero" style={bg("/assets/background.png")}>
        <div className="ff-hero-overlay" />
        <div className="ff-hero-text">
          <h1>
            <span className="ff-stylish">Stylish</span>
            <span className="handpicked">Handpicked</span>
          </h1>
          <p>STRONG AND HEALTHY</p>
        </div>
      </section>

     
      <section className="ff-categories ff-container">
        <article className="ff-card" style={bg("/assets/apparel.png")}>
          <div className="ff-card-gradient" />
          <div className="ff-card-inner">
            <h3>GYM APPAREL</h3>
            <button className="ff-pill" onClick={() => navigate("/apparel")}>SHOP NOW</button>
          </div>
        </article>

        <article className="ff-card" style={bg("/assets/gym supplements.png")}>
          <div className="ff-card-gradient" />
          <div className="ff-card-inner">
            <h3>GYM SUPPLEMENT</h3>
            <button className="ff-pill" onClick={() => navigate("/supplements")}>SHOP NOW</button>
          </div>
        </article>

        <article className="ff-card" style={bg("/assets/equipment.png")}>
          <div className="ff-card-gradient" />
          <div className="ff-card-inner">
            <h3>GYM EQUIPMENTS</h3>
            <button className="ff-pill" onClick={() => navigate("/equipments")}>SHOP NOW</button>
          </div>
        </article>
      </section>

      <section className="ff-services ff-container">
        <div className="ff-service">
          <img src="/assets/ExpressIcon.png" alt="" onError={(e)=>e.currentTarget.style.display='none'} />
          <h4>Express Delivery</h4>
        </div>
        <div className="ff-service">
          <img src="/assets/CustomerSupp.png" alt="" onError={(e)=>e.currentTarget.style.display='none'} />
          <h4>Free Customer Support</h4>
        </div>
        <div className="ff-service">
          <img src="/assets/SecureCheck.png" alt="" onError={(e)=>e.currentTarget.style.display='none'} />
          <h4>Secure Checkout</h4>
        </div>
      </section>


      <section className="ff-ultimate" style={bg("/assets/ultimate.png")}>
        <div className="ff-ultimate-overlay" />
        <div className="ff-ultimate-inner ff-container">
          <h2>ULTIMATE <span>COLLECTION</span></h2>
          <p>New to this? In need of any equipments and supplements? Let us send you a starter guide.</p>
          <div className="ff-ultimate-icons">
            <div><strong>1.</strong> Free Shipping</div>
            <div><strong>2.</strong> Safe Payment</div>
            <div><strong>3.</strong> Hassle Free Returns</div>
          </div>
          <button className="ff-btn solid" onClick={() => navigate("/signup")}>
            GET STARTED
          </button>
        </div>
      </section>
    </div>
  );
}
