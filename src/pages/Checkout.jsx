import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Checkout.css";

const CART_KEY = "ff_cart";
const COUPON_KEY = "ff_coupon";

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
};
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const saveCoupon = (coupon) => localStorage.setItem(COUPON_KEY, JSON.stringify(coupon || null));
const loadCoupon = () => {
  try { return JSON.parse(localStorage.getItem(COUPON_KEY)); }
  catch { return null; }
};

const peso = (n) => "₱ " + Number(n || 0).toLocaleString("en-PH", { maximumFractionDigits: 0 });


const VOUCHERS = {
  FF10:  { code: "FF10", type: "percent", value: 10, label: "10% off (sitewide)" },
  LESS50: { code: "LESS50", type: "flat",    value: 50, label: "₱50 off (min ₱500)", minSubtotal: 500 },
  FREESHIP:{ code: "FREESHIP", type: "freeship", label: "Free Shipping" },
};

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    setCart(loadCart());
    const saved = loadCoupon();
    if (saved) setAppliedCoupon(saved);
  }, []);

  const updateQty = (index, delta) => {
    setCart((prev) => {
      const next = [...prev];
      next[index].qty = Math.max(1, next[index].qty + delta);
      saveCart(next);
      return next;
    });
  };

  const removeItem = (index) => {
    setCart((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveCart(next);
      return next;
    });
  };

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, it) => sum + it.price * it.qty, 0),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percent") {
      return Math.round((cartSubtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.type === "flat") {
      const amt = appliedCoupon.value || 0;
      return Math.min(amt, cartSubtotal); 
    }
    return 0;
  }, [appliedCoupon, cartSubtotal]);


  const baseShipping = cart.length ? 80 : 0;
  const shipping = appliedCoupon?.type === "freeship" ? 0 : baseShipping;

  const orderTotal = Math.max(0, cartSubtotal - discountAmount) + shipping;

  const applyVoucher = (rawCode) => {
    const code = (rawCode || "").trim().toUpperCase();
    const v = VOUCHERS[code];
    if (!code) {
      setCouponMsg({ type: "err", text: "Enter a voucher code." });
      return;
    }
    if (!v) {
      setCouponMsg({ type: "err", text: "Invalid voucher code." });
      return;
    }

    if (v.minSubtotal && cartSubtotal < v.minSubtotal) {
      setCouponMsg({
        type: "err",
        text: `Minimum subtotal of ${peso(v.minSubtotal)} required for this voucher.`,
      });
      return;
    }
    setAppliedCoupon(v);
    saveCoupon(v);
    setCouponMsg({ type: "ok", text: `Applied: ${v.label}` });
  };

  const clearVoucher = () => {
    setAppliedCoupon(null);
    saveCoupon(null);
    setCouponMsg({ type: "ok", text: "Voucher removed." });
  };

  const quickApply10 = () => applyVoucher("FF10");

  return (
    <div className="ff-home">
      
      <div className="ff-topbar">
        <div className="ff-container ff-topbar-inner">
          <button className="ff-burger" aria-label="Toggle menu">
            <span/><span/><span/>
          </button>
          <ul className="ff-nav">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/account">MY ACCOUNT</Link></li>
            <li><Link to="/supplements">PRODUCTS</Link></li>
            <li><Link className="is-active" to="/checkout">CHECKOUT</Link></li>
            <li><Link to="/contacts">CONTACTS</Link></li>
          </ul>
        </div>
      </div>


      <header className="ff-header ff-container">
        <img className="ff-logo" src="/assets/logo.png" alt="Flex & Fuel" />
        <div className="ff-search">
          <input type="text" placeholder="Search..." />
           <button type="button" className="ff-icon" aria-label="Search">
            <img src="/assets/searchButton.png" alt="" className="ff-icon-img" /></button>
          <button type="button" className="ff-icon" aria-label="Cart">
            <img src="/assets/cartButton.png" alt="" className="ff-icon-img" /></button>
        </div>
      </header>

      <div className="ff-container ck-heading-wrap">
        <h1 className="ck-heading">Shopping <span>Cart</span></h1>
      </div>


      <section className="ff-container ck-panel">
        {!cart.length ? (
          <div className="ck-empty">
            <p>Your cart is empty.</p>
            <Link className="ck-apply" to="/supplements">Go back to Products</Link>
          </div>
        ) : (
          <div className="ck-table">
            <div className="ck-row ck-row--head">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>

            {cart.map((item, idx) => (
              <div className="ck-row" key={item.id}>
                <div className="ck-prod">
                  <img src={item.img} alt={item.title} />
                  <div className="ck-prod-name">
                    {item.title}
                    <button className="ck-remove" onClick={() => removeItem(idx)}>Remove</button>
                  </div>
                </div>
                <div className="ck-price">{peso(item.price)}</div>
                <div className="ck-qty">
                  <button onClick={() => updateQty(idx, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(idx, +1)}>+</button>
                </div>
                <div className="ck-total">{peso(item.price * item.qty)}</div>
              </div>
            ))}

            <div className="ck-cta-right">
              <button className="ck-checkout">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </section>

      
      <section className="ff-container ck-bottom">
        {/* Coupon */}
        <div className="ck-card">
          <h4>Coupon Code</h4>
          <input
            className="ck-input"
            type="text"
            placeholder="Enter code (e.g., FF10, LESS50, FREESHIP)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="ck-apply" onClick={() => applyVoucher(couponInput)}>APPLY</button>
            {appliedCoupon && (
              <button className="ck-apply" style={{ background:"#111" }} onClick={clearVoucher}>
                REMOVE
              </button>
            )}
          </div>

          {/* status message */}
          {couponMsg.text && (
            <div className={`ck-voucher-msg ${couponMsg.type === "ok" ? "ok" : "err"}`}>
              {couponMsg.text}
            </div>
          )}

          {/* clickable sticker -> auto-apply FF10 */}
          <button type="button" className="ck-sticker" onClick={quickApply10}>
            GET VOUCHER 10% OFF
          </button>
        </div>

        {/* Shipping calc (placeholder) */}
        <div className="ck-card">
          <h4>Calculate Shipping</h4>
          <input className="ck-input" type="text" placeholder="Province*" />
        </div>

        {/* Totals */}
        <div className="ck-card ck-totals">
          <h4>Cart Totals</h4>
          <div className="ck-tline">
            <span>Cart Subtotal:</span>
            <strong>{peso(cartSubtotal)}</strong>
          </div>

          {appliedCoupon && (
            <div className="ck-tline">
              <span>
                Discount {appliedCoupon.type === "percent" ? `(${appliedCoupon.value}% - ${appliedCoupon.code})` : `(${appliedCoupon.code})`}
              </span>
              <strong>-{peso(discountAmount)}</strong>
            </div>
          )}

          <div className="ck-tline">
            <span>Shipping{appliedCoupon?.type === "freeship" ? " (free)" : ""}:</span>
            <strong>{peso(shipping)}</strong>
          </div>

          <div className="ck-tline ck-tline--total">
            <span>Order Total:</span>
            <strong>{peso(orderTotal)}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
