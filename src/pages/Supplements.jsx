// src/pages/Supplements.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Supplements.css";




const CART_KEY = "ff_cart";
const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
};
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const countItems = (cart) => cart.reduce((n, it) => n + (it.qty || 0), 0);

export default function Supplements() {
  const [openNav, setOpenNav] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const cartRef = useRef(null);          
  const [activeTab, setActiveTab] = useState("supplements");
  useEffect(() => {
    setCartCount(countItems(loadCart()));
  }, []);

  const addToCart = (product) => {
    const cart = loadCart();
    const i = cart.findIndex((p) => p.id === product.id);
    if (i >= 0) cart[i].qty += 1;
    else cart.push({ ...product, qty: 1 });
    saveCart(cart);
    setCartCount(countItems(cart));
  };

  // Make a small “pop” on the button, fly image to cart, bump cart
  const animateAdd = (evt) => {
    // pop the button
    const btn = evt.currentTarget;
    btn.classList.add("is-popping");
    setTimeout(() => btn.classList.remove("is-popping"), 150);

    // find product image in the same card
    const card = btn.closest(".sup-card");
    const img = card?.querySelector(".sup-thumb");
    const cartEl = cartRef.current;
    if (!img || !cartEl) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    // clone a small image and fly it
    const ghost = img.cloneNode(true);
    ghost.classList.add("fly-img");
    ghost.style.left = `${imgRect.left + window.scrollX}px`;
    ghost.style.top = `${imgRect.top + window.scrollY}px`;
    ghost.style.width = `${imgRect.width}px`;
    ghost.style.height = `${imgRect.height}px`;
    document.body.appendChild(ghost);

    // force reflow then transition to cart center
    // compute translate distance
    const startX = imgRect.left + imgRect.width / 2;
    const startY = imgRect.top + imgRect.height / 2 + window.scrollY;
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2 + window.scrollY;
    const dx = endX - startX;
    const dy = endY - startY;
    // next frame
    requestAnimationFrame(() => {
      ghost.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
      ghost.style.opacity = "0";
    });
    ghost.addEventListener("transitionend", () => {
      ghost.remove();
      // bump cart after flight completes
      cartEl.classList.remove("is-bump");
      // trigger animation restart
      // eslint-disable-next-line no-unused-expressions
      cartEl.offsetWidth;
      cartEl.classList.add("is-bump");
    });
  };

  // combined handler: add then animate; stays on page
  const handleAdd = (evt, product) => {
    addToCart(product);
    animateAdd(evt);
  };

  return (
    <div className="ff-home">
      {/* ===== TOPBAR ===== */}
      <div className="ff-topbar">
        <div className="ff-container ff-topbar-inner">
          <button className="ff-burger" aria-label="Toggle menu" onClick={() => setOpenNav(v=>!v)}>
            <span/><span/><span/>
          </button>
          <ul className={`ff-nav ${openNav ? "is-open" : ""}`}>
            <li onClick={()=>setOpenNav(false)}><Link to="/">HOME</Link></li>
            <li onClick={()=>setOpenNav(false)}><Link to="/account">MY ACCOUNT</Link></li>
            <li onClick={()=>setOpenNav(false)}><Link to="equipments">PRODUCTS</Link></li>
            <li onClick={()=>setOpenNav(false)}><Link to="/checkout">CHECKOUT</Link></li>
            <li onClick={()=>setOpenNav(false)}><Link to="/contacts">CONTACTS</Link></li>
          </ul>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="ff-header ff-container">
        <img className="ff-logo" src="/assets/logo.png" alt="Flex & Fuel" />
        <div className="ff-search">
          <input type="text" placeholder="Search..." />
           <button type="button" className="ff-icon" aria-label="Search">
            <img src="/assets/searchButton.png" alt="" className="ff-icon-img" /></button>

            <Link ref={cartRef} className="ff-icon ff-cart" aria-label="Cart" to="/checkout" title="Go to checkout">
            <img src="/assets/cartButton.png" alt="" className="ff-icon-img" />
            {cartCount > 0 && <span className="ff-cart-badge">{cartCount}</span>}</Link>
        </div>
      </header>

      
      <section className="sup-tabs-wrap">
        <div className="ff-container sup-tabs">
          <Link className={`sup-tab ${activeTab === "apparel" ? "is-active" : ""}`} to="/apparel" onClick={() => setActiveTab("apparel")}>
           APPAREL </Link> 
          <Link className={`sup-tab ${activeTab === "supplements" ? "is-active" : ""}`} to="/supplements" onClick={() => setActiveTab("supplements")}>
          SUPPLEMENTS </Link>
          <Link className={`sup-tab ${activeTab === "equipments" ? "is-active" : ""}`} to="/equipments" onClick={() => setActiveTab("equipments")}>
          EQUIPMENTS</Link>
        </div>
      </section>
      
      <section className="ff-container sup-banners">
        <img className="sup-banner" src="/assets/banner1.png"  alt="Supplements promo left" />
        <img className="sup-banner" src="/assets/banner2.png" alt="Supplements promo right" />
      </section>

      <div className="sup-hr"></div>
      <h2 className="sup-heading ff-container">OUR PRODUCTS</h2>

      {/* ===== PRODUCT GRID ===== */}
      <main className="ff-container sup-grid">
        {/* Card 1 */}
        <article className="sup-card">
          <span className="sup-badge sup-badge-hot">HOT</span>
          <img className="sup-thumb" src="/assets/Whey.png" alt="Whey Protein" />
          <div className="sup-info">
            <h3 className="sup-title">Whey Protein</h3>
            <div className="sup-price">₱1,299</div>
            <button
              className="sup-add"
              onClick={(e) => handleAdd(e, { id: "whey-1299", title: "Whey Protein", price: 1299, img: "/assets/Whey.png" })}
            ><span>🛒</span> ADD</button>
          </div>
        </article>

        {/* Card 2 */}
        <article className="sup-card">
          <span className="sup-badge sup-badge-new">NEW</span>
          <img className="sup-thumb" src="/assets/MP.png" alt="MusclePharm Wreckage" />
          <div className="sup-info">
            <h3 className="sup-title">MusclePharm Wreckage</h3>
            <div className="sup-price">₱1,090</div>
            <button
              className="sup-add"
              onClick={(e) => handleAdd(e, { id: "mp-wreckage-1090", title: "MusclePharm Wreckage", price: 1090, img: "/assets/MP.png" })}
            ><span>🛒</span> ADD</button>
          </div>
        </article>

        {/* Card 3 */}
        <article className="sup-card">
          <span className="sup-badge sup-badge-hot">HOT</span>
          <img className="sup-thumb" src="/assets/EXO.png" alt="EXO Pre-Workout" />
          <div className="sup-info">
            <h3 className="sup-title">EXO Pre-Workout</h3>
            <div className="sup-price">₱990</div>
            <button
              className="sup-add"
              onClick={(e) => handleAdd(e, { id: "exo-990", title: "EXO Pre-Workout", price: 990, img: "/assets/EXO.png" })}
            ><span>🛒</span> ADD</button>
          </div>
        </article>

        {/* Card 4 */}
        <article className="sup-card">
          <img className="sup-thumb" src="/assets/warrior.png" alt="Warrior Rage" />
          <div className="sup-info">
            <h3 className="sup-title">Warrior Rage</h3>
            <div className="sup-price">₱1,150</div>
            <button
              className="sup-add"
              onClick={(e) => handleAdd(e, { id: "warrior-1150", title: "Warrior Rage", price: 1150, img: "/assets/warrior.png" })}
            ><span>🛒</span> ADD</button>
          </div>
        </article>

        {/* Card 5 */}
        <article className="sup-card">
          <img className="sup-thumb" src="/assets/Hydoxy.png" alt="HydroWorx 5.7 Black Onyx" />
          <div className="sup-info">
            <h3 className="sup-title">HydroWorx 5.7 Black Onyx</h3>
            <div className="sup-price">₱1,399</div>
            <button
              className="sup-add"
              onClick={(e) => handleAdd(e, { id: "hydro-1399", title: "HydroWorx 5.7 Black Onyx", price: 1399, img: "/assets/Hydoxy.png" })}
            ><span>🛒</span> ADD</button>
          </div>
        </article>

        {/* Card 6 */}
        <article className="sup-card">
          <span className="sup-badge sup-badge-sale">SALE</span>
          <img className="sup-thumb" src="/assets/Ghost.png" alt="Ghost Legend" />
          <div className="sup-info">
            <h3 className="sup-title">Ghost Legend</h3>
            <div className="sup-price">₱1,250</div>
            <button
              className="sup-add"
              onClick={(e) => handleAdd(e, { id: "ghost-1250", title: "Ghost Legend", price: 1250, img: "/assets/Ghost.png" })}
            ><span>🛒</span> ADD</button>
          </div>
        </article>

        {/* Card 7 */}
        <article className="sup-card">
          <img className="sup-thumb" src="/assets/MaxGain.png" alt="MaxGain Protein" />
          <div className="sup-info">
            <h3 className="sup-title">MaxGainProtein</h3>
            <div className="sup-price">₱899</div>
            <button
              className="sup-add"
              onClick={(e) => handleAdd(e, { id: "maxgain-899", title: "MaxGainProtein", price: 899, img: "/assets/MaxGain.png" })}
            ><span>🛒</span> ADD</button>
          </div>
        </article>

        {/* Card 8 */}
        <article className="sup-card">
          <span className="sup-badge sup-badge-hot">HOT</span>
          <img className="sup-thumb" src="/assets/MuscleTech.png" alt="MuscleTech Whey Protein" />
          <div className="sup-info">
            <h3 className="sup-title">MuscleTech Whey Protein</h3>
            <div className="sup-price">₱1,299</div>
            <button
              className="sup-add"
              onClick={(e) => handleAdd(e, { id: "mt-whey-1299", title: "MuscleTech Whey Protein", price: 1299, img: "/assets/MuscleTech.png" })}
            ><span>🛒</span> ADD</button>
          </div>
        </article>
      </main>
    </div>
  );
}
