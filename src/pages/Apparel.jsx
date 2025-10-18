// src/pages/Apparel.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Supplements.css"; 
import "../css/Apparel.css";

const CART_KEY = "ff_cart";
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; } };
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const countItems = (cart) => cart.reduce((n, it) => n + (it.qty || 0), 0);

export default function Apparel() {
  const [openNav, setOpenNav] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const cartRef = useRef(null);
  const [activeTab, setActiveTab] = useState("apparel");

  useEffect(() => { setCartCount(countItems(loadCart())); }, []);

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

    const startX = imgRect.left + imgRect.width/2;
    const startY = imgRect.top + imgRect.height/2 + window.scrollY;
    const endX = cartRect.left + cartRect.width/2;
    const endY = cartRect.top + cartRect.height/2 + window.scrollY;
    const dx = endX - startX, dy = endY - startY;

    requestAnimationFrame(() => {
      ghost.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
      ghost.style.opacity = "0";
    });
    ghost.addEventListener("transitionend", () => {
      ghost.remove();
      cartEl.classList.remove("is-bump");
      // eslint-disable-next-line no-unused-expressions
      cartEl.offsetWidth;
      cartEl.classList.add("is-bump");
    });
  };

  const handleAdd = (e, product) => { addToCart(product); animateAdd(e); };

  return (
    <div className="ff-home">
   
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

      {/* MEN */}
      <main className="ff-container">
        <h2 className="app-title">Men’s <span>Style</span></h2>
        <section className="sup-grid">
          <article className="sup-card">
            <span className="sup-badge sup-badge-hot">HOT</span>
            <img className="sup-thumb" src="/assets/ActiveSet.png" alt="Men's Active Set" />
            <div className="sup-info">
              <h3 className="sup-title">Men's Active Set</h3>
              <div className="sup-price">₱1,299</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"men-active-1299", title:"Men's Active Set", price:1299, img:"/assets/ActiveSet.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <span className="sup-badge sup-badge-new">NEW</span>
            <img className="sup-thumb" src="/assets/MuscleTank.png" alt="Muscle Tank" />
            <div className="sup-info">
              <h3 className="sup-title">Muscle Tank</h3>
              <div className="sup-price">₱499</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"muscle-tank-499", title:"Muscle Tank", price:499, img:"/assets/MuscleTank.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <span className="sup-badge sup-badge-sale">SALE</span>
            <img className="sup-thumb" src="/assets/sleevelessTank.png" alt="Sleeveless Pack" />
            <div className="sup-info">
              <h3 className="sup-title">Sleeveless Pack</h3>
              <div className="sup-price">₱799</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"sleeveless-pack-799", title:"Sleeveless Pack", price:799, img:"/assets/sleevelessTank.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <img className="sup-thumb" src="/assets/CompressionTank.png" alt="Compression Tee" />
            <div className="sup-info">
              <h3 className="sup-title">Compression Tee</h3>
              <div className="sup-price">₱749</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"compression-tee-749", title:"Compression Tee", price:749, img:"/assets/CompressionTank.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <img className="sup-thumb" src="/assets/CompShort.png" alt="Camp Shorts" />
            <div className="sup-info">
              <h3 className="sup-title">Camp Shorts</h3>
              <div className="sup-price">₱649</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"camp-shorts-649", title:"Camp Shorts", price:649, img:"/assets/CompShort.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <img className="sup-thumb" src="/assets/Jogger.png" alt="Jogger Pants" />
            <div className="sup-info">
              <h3 className="sup-title">Jogger Pants</h3>
              <div className="sup-price">₱899</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"jogger-899", title:"Jogger Pants", price:899, img:"/assets/Jogger.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <img className="sup-thumb" src="/assets/GymShort.png" alt="Gym Shorts" />
            <div className="sup-info">
              <h3 className="sup-title">Gym Shorts</h3>
              <div className="sup-price">₱599</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"gym-shorts-599", title:"Gym Shorts", price:599, img:"/assets/GymShort.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>
        </section>

    
        <h2 className="app-title right">Women’s <span>Style</span></h2>
        <section className="sup-grid">
          <article className="sup-card">
            <img className="sup-thumb" src="/assets/TankTop.png" alt="Tank Top" />
            <div className="sup-info">
              <h3 className="sup-title">Tank Top</h3>
              <div className="sup-price">₱449</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"tank-top-449", title:"Tank Top", price:449, img:"/assets/TankTop.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <span className="sup-badge sup-badge-new">NEW</span>
            <img className="sup-thumb" src="/assets/CropTee.png" alt="Crop Tee" />
            <div className="sup-info">
              <h3 className="sup-title">Crop Tee</h3>
              <div className="sup-price">₱499</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"crop-tee-499", title:"Crop Tee", price:499, img:"/assets/CropTee.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <img className="sup-thumb" src="/assets/LongCrop.png" alt="Long Sleeve Crop" />
            <div className="sup-info">
              <h3 className="sup-title">Long Sleeve Crop</h3>
              <div className="sup-price">₱599</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"long-crop-599", title:"Long Sleeve Crop", price:599, img:"/assets/LongCrop.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <span className="sup-badge sup-badge-hot">HOT</span>
            <img className="sup-thumb" src="/assets/WomenSet.png" alt="Women's Duo Set" />
            <div className="sup-info">
              <h3 className="sup-title">Women's Duo Set</h3>
              <div className="sup-price">₱1,199</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"women-set-1199", title:"Women's Duo Set", price:1199, img:"/assets/WomenSet.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <img className="sup-thumb" src="/assets/BikerShort.png" alt="Biker Shorts" />
            <div className="sup-info">
              <h3 className="sup-title">Biker Shorts</h3>
              <div className="sup-price">₱549</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"biker-shorts-549", title:"Biker Shorts", price:549, img:"/assets/BikerShort.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <img className="sup-thumb" src="/assets/Leggings.png" alt="Seamless Leggings" />
            <div className="sup-info">
              <h3 className="sup-title">Seamless Leggings</h3>
              <div className="sup-price">₱799</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"leggings-799", title:"Seamless Leggings", price:799, img:"/assets/Leggings.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>

          <article className="sup-card">
            <img className="sup-thumb" src="/assets/HighWaist.png" alt="High Waist Shorts" />
            <div className="sup-info">
              <h3 className="sup-title">High Waist Shorts</h3>
              <div className="sup-price">₱599</div>
              <button className="sup-add"
                onClick={(e)=>handleAdd(e,{id:"high-waist-599", title:"High Waist Shorts", price:599, img:"/assets/HighWaist.png"})}
              ><span>🛒</span> ADD</button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
