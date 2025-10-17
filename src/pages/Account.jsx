
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Account.css";

const EMPTY = {
  avatar: "",
  gender: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  birthdate: "",
  postal: "",
};

export default function Account() {
  const [openNav, setOpenNav] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(null); 


  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("ff_user") || "{}");
      setForm({ ...EMPTY, ...data });
      setSaved({ ...EMPTY, ...data });
    } catch {
      setForm(EMPTY);
      setSaved(EMPTY);
    }
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
 
    localStorage.setItem("ff_user", JSON.stringify(form));
    setSaved(form);
    alert("Changes saved.");
  };

  const onDiscard = () => {
    setForm(saved || EMPTY);
  };

  const onLogout = () => {
    localStorage.removeItem("ff_user");
    setSaved(EMPTY);
    setForm(EMPTY);
    alert("You’ve been logged out (demo).");
  };

  const displayName = useMemo(() => {
    const { firstName, lastName } = saved || form;
    const n = [firstName, lastName].filter(Boolean).join(" ").trim();
    return n || "YOUR NAME";

  }, [saved, form]);

  return (
    <div className="ff-home">
      {/* ===== TOPBAR ===== */}
      <div className="ff-topbar">
        <div className="ff-container ff-topbar-inner">
          <button className="ff-burger" aria-label="Toggle menu" onClick={() => setOpenNav(v => !v)}>
            <span/><span/><span/>
          </button>
          <ul className={`ff-nav ${openNav ? "is-open" : ""}`}>
            <li onClick={()=>setOpenNav(false)}><Link to="/">HOME</Link></li>
            <li onClick={()=>setOpenNav(false)}><Link className="is-active" to="/account">MY ACCOUNT</Link></li>
            <li><Link to="/supplements">PRODUCTS</Link></li>
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
          <button type="button" className="ff-icon" aria-label="Cart">
            <img src="/assets/cartButton.png" alt="" className="ff-icon-img" /></button>
        </div>
      </header>


      <main className="ff-container acct-grid">
       
        <aside className="acct-side">
          <div className="acct-user">
            <div className="acct-avatar">
              <img src={(saved?.avatar || form.avatar) || "/assets/account/avatar-placeholder.jpg"} alt="Profile"/>
            </div>
            <div className="acct-name">{displayName}</div>
            <div className="acct-role">user</div>
          </div>

          <nav className="acct-nav">
            <button className="acct-item is-active">Personal Information</button>
            <button className="acct-item" disabled>Payment</button>
            <button className="acct-item" disabled>Security</button>
            <button className="acct-item" onClick={onLogout}>Logout</button>
          </nav>
        </aside>

        
        <section className="acct-main">
          <form className="acct-card" onSubmit={onSubmit}>
            <h2 className="acct-title">Personal Information</h2>

            <div className="acct-gender">
              <label className={`acct-radio ${form.gender === "male" ? "checked" : ""}`}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === "male"}
                  onChange={update("gender")}
                />
                <span/> Male
              </label>
              <label className={`acct-radio ${form.gender === "female" ? "checked" : ""}`}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === "female"}
                  onChange={update("gender")}
                />
                <span/> Female
              </label>
            </div>

            <div className="acct-row">
              <div className="acct-field">
                <label>First Name</label>
                <input value={form.firstName} onChange={update("firstName")} placeholder="" />
              </div>
              <div className="acct-field">
                <label>Last Name</label>
                <input value={form.lastName} onChange={update("lastName")} placeholder="" />
              </div>
            </div>

            <div className="acct-row">
              <div className="acct-field">
                <label>Email</label>
                <input type="email" value={form.email} onChange={update("email")} placeholder="" />
              </div>
              <div className="acct-field">
                <label>Phone #</label>
                <input value={form.phone} onChange={update("phone")} placeholder="" />
              </div>
            </div>

            <div className="acct-field">
              <label>Address</label>
              <input value={form.address} onChange={update("address")} placeholder="" />
            </div>

            <div className="acct-row">
              <div className="acct-field">
                <label>Birthdate</label>
                <input type="date" value={form.birthdate} onChange={update("birthdate")} />
              </div>
              <div className="acct-field">
                <label>Postal Code</label>
                <input value={form.postal} onChange={update("postal")} placeholder="" />
              </div>
            </div>

            <div className="acct-actions">
              <button type="button" className="acct-btn ghost" onClick={onDiscard}>Discard Changes</button>
              <button type="submit" className="acct-btn solid">Save Changes</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
