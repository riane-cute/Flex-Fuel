// src/pages/Equipments.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Equipments.css";   
import "../css/Supplements.css";  



const CART_KEY = "ff_cart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; } };
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const countItems = (cart) => cart.reduce((n, it) => n + (it.qty || 0), 0);

export default function Equipments() {
  const [openNav, setOpenNav] = useState(false);
  const railRef = useRef(null);
  const cartRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState("equipments");


  useEffect(() => { setCartCount(countItems(loadCart())); }, []);

  const scrollRail = (dir) => {
    const rail = railRef.current; if (!rail) return;
    const card = rail.querySelector(".eq-cat-card");
    const step = card ? card.offsetWidth + 16 : 260;
    rail.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const addToCart = (product) => {
    const cart = loadCart();
    const i = cart.findIndex(p => p.id === product.id);
    if (i >= 0) cart[i].qty += 1; else cart.push({ ...product, qty: 1 });
    saveCart(cart);
    setCartCount(countItems(cart));
  };

  const animateAdd = (evt) => {
    const btn = evt.currentTarget;
    btn.classList.add("is-popping");
    setTimeout(() => btn.classList.remove("is-popping"), 150);

    const card = btn.closest(".sup-card");
    const img = card?.querySelector(".sup-thumb");
    const cartEl = cartRef.current;
    if (!img || !cartEl) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();
    const ghost = img.cloneNode(true);
    ghost.classList.add("fly-img");
    ghost.style.left = `${imgRect.left + window.scrollX}px`;
    ghost.style.top = `${imgRect.top + window.scrollY}px`;
    ghost.style.width = `${imgRect.width}px`;
    ghost.style.height = `${imgRect.height}px`;
    document.body.appendChild(ghost);

    const startX = imgRect.left + imgRect.width / 2;
    const startY = imgRect.top + imgRect.height / 2 + window.scrollY;
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2 + window.scrollY;
    const dx = endX - startX, dy = endY - startY;

    requestAnimationFrame(() => {
      ghost.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
      ghost.style.opacity = "0";
    });
    ghost.addEventListener("transitionend", () => {
      ghost.remove();
      cartEl.classList.remove("is-bump"); // reset
      // eslint-disable-next-line no-unused-expressions
      cartEl.offsetWidth;
      cartEl.classList.add("is-bump");
    });
  };

  const handleAdd = (e, product) => { addToCart(product); animateAdd(e); };

  return (
    <div className="ff-home">
      {/* TOPBAR */}
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

      {/* HEADER */}
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


      {/* HERO */}
      <section className="eq-hero">
       <img src={process.env.PUBLIC_URL + "/assets/EquipmentBg.png"} alt="Sport and Health" />
        <div className="eq-hero-title">Sport and Health</div>
      </section>

      {/* CATEGORY SCROLLER */}
      <section className="ff-container eq-cats-wrap">
        <button className="eq-arrow left" aria-label="Prev" onClick={()=>scrollRail("left")}>❮</button>
        <div className="eq-rail" ref={railRef}>
          <article className="eq-cat-card"><img src="/assets/Treadmill.png" alt="Treadmills" /><h4>Treadmills</h4></article>
          <article className="eq-cat-card"><img src="/assets/Freeweights.png" alt="Free Weights" /><h4>Free Weights</h4></article>
          <article className="eq-cat-card"><img src="/assets/RowingMachine.png" alt="Rowing Machines" /><h4>Rowing Machines</h4></article>
          <article className="eq-cat-card"><img src="/assets/Preacher.png" alt="Preacher Curl" /><h4>Preacher Curl</h4></article>
        </div>
        <button className="eq-arrow right" aria-label="Next" onClick={()=>scrollRail("right")}>❯</button>
      </section>

      {/* FEATURED */}
      <h2 className="sup-heading ff-container">FEATURED PRODUCTS</h2>

      <main className="ff-container sup-grid">
        {/* Smith Machine */}
        <article className="sup-card">
          <img className="sup-thumb" src="/assets/SmithMachine.png" alt="Smith Machine" />
          <div className="sup-info">
            <h3 className="sup-title">Smith Machine</h3>
            <div className="sup-price">₱24,000</div>
            <button className="sup-add" onClick={(e)=>handleAdd(e,{id:"smith-24000", title:"Smith Machine", price:24000, img:"/assets/SmithMachine.png"})}>
              <span>🛒</span> ADD
            </button>
          </div>
        </article>

        {/* Cable Machine */}
        <article className="sup-card">
          <img className="sup-thumb" src="/assets/CableMachine.png" alt="Cable Machine" />
          <div className="sup-info">
            <h3 className="sup-title">Cable Machine</h3>
            <div className="sup-price">₱20,000</div>
            <button className="sup-add" onClick={(e)=>handleAdd(e,{id:"cable-20000", title:"Cable Machine", price:20000, img:"/assets/CableMachine.png"})}>
              <span>🛒</span> ADD
            </button>
          </div>
        </article>

        {/* Parallel Bar */}
        <article className="sup-card">
          <img className="sup-thumb" src="/assets/ParallelBar.png" alt="Parallel Bar" />
          <div className="sup-info">
            <h3 className="sup-title">Parallel Bar</h3>
            <div className="sup-price">₱3,500</div>
            <button className="sup-add" onClick={(e)=>handleAdd(e,{id:"parallel-3500", title:"Parallel Bar", price:3500, img:"/assets/ParallelBar.png"})}>
              <span>🛒</span> ADD
            </button>
          </div>
        </article>

        {/* Pull-up Bar */}
        <article className="sup-card">
          <img className="sup-thumb" src="/assets/PullUp.png" alt="Pull-up Bar" />
          <div className="sup-info">
            <h3 className="sup-title">Pull-up Bar</h3>
            <div className="sup-price">₱2,200</div>
            <button className="sup-add" onClick={(e)=>handleAdd(e,{id:"pullup-2200", title:"Pull-up Bar", price:2200, img:"/assets/PullUp.png"})}>
              <span>🛒</span> ADD
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
