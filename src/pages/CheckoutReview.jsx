import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";
import "../css/Checkout.css"; // reuse the same theme

const peso = (n) => "₱ " + Number(n || 0).toLocaleString("en-PH", { maximumFractionDigits: 0 });

export default function CheckoutReview() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ff_checkout") || "null");
      setData(saved);
    } catch {
      setData(null);
    }
  }, []);

  const subtotal = useMemo(() => data?.summary?.subtotal || 0, [data]);
  const discount = useMemo(() => data?.summary?.discount || 0, [data]);
  const shipping = useMemo(() => data?.summary?.shipping || 0, [data]);
  const total = useMemo(() => data?.summary?.total || 0, [data]);

  const placeOrder = () => {
    if (!data?.items?.length) { navigate("/checkout"); return; }
   
    alert("Order placed!");
    localStorage.removeItem("ff_checkout");
    
    navigate("/");
  };

  if (!data) {
    return (
      <div className="ff-home">
        <div className="ff-topbar"><div className="ff-container ff-topbar-inner">
          <ul className="ff-nav">
            <li><Link to="/">HOME</Link></li>
          </ul>
        </div></div>
        <header className="ff-header ff-container">
          <img className="ff-logo" src="/assets/logo.png" alt="Flex & Fuel" />
          <div className="ff-search"><input placeholder="Search..." /></div>
        </header>
        <div className="ff-container ck-heading-wrap">
          <h1 className="ck-heading">Checkout <span>Review</span></h1>
        </div>
        <section className="ff-container ck-panel">
          <div className="ck-empty">
            <p>No items to review.</p>
            <Link className="ck-apply" to="/checkout">Back to Cart</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="ff-home">
      {/* Topbar */}
      <div className="ff-topbar">
        <div className="ff-container ff-topbar-inner">
          <ul className="ff-nav">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/checkout">CHECKOUT</Link></li>
          </ul>
        </div>
      </div>

      {/* Header */}
      <header className="ff-header ff-container">
        <img className="ff-logo" src="/assets/logo.png" alt="Flex & Fuel" />
        <div className="ff-search"><input placeholder="Search..." /></div>
      </header>

      <div className="ff-container ck-heading-wrap">
        <h1 className="ck-heading">Checkout <span>Review</span></h1>
      </div>

      <section className="ff-container ck-panel">
        <div className="ck-table">
          <div className="ck-row ck-row--head">
            <div>Product</div><div>Price</div><div>Quantity</div><div>Total</div>
          </div>

          {data.items.map((it, i) => (
            <div className="ck-row" key={it.id ?? i}>
              <div className="ck-prod">
                <img src={it.img} alt={it.title} />
                <div className="ck-prod-name">{it.title}</div>
              </div>
              <div className="ck-price">{peso(it.price)}</div>
              <div className="ck-qty"><span>{it.qty}</span></div>
              <div className="ck-total">{peso((it.price || 0) * (it.qty || 1))}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ff-container ck-bottom">
        <div className="ck-card ck-totals" style={{ marginLeft: "auto" }}>
          <h4>Order Summary</h4>
          <div className="ck-tline"><span>Subtotal:</span><strong>{peso(subtotal)}</strong></div>
          {data.coupon && (
            <div className="ck-tline">
              <span>Discount ({data.coupon.code}):</span>
              <strong>-{peso(discount)}</strong>
            </div>
          )}
          <div className="ck-tline"><span>Shipping:</span><strong>{peso(shipping)}</strong></div>
          <div className="ck-tline ck-tline--total">
            <span>Total:</span><strong>{peso(total)}</strong>
          </div>

          <div style={{ display:"flex", gap:10, marginTop:12 }}>
            <button className="ck-apply" onClick={() => navigate("/checkout")}>Back to Cart</button>
            <button className="ck-checkout" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      </section>
    </div>
  );
}
