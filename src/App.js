import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Apparel from "./pages/Apparel";
import Supplements from "./pages/Supplements";
import Equipments from "./pages/Equipments";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";

const Placeholder = ({ title }) => (
  <div style={{ padding: 24 }}>{title} page</div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apparel" element={<Apparel />} />
      <Route path="/supplements" element={<Supplements />} />
      <Route path="/equipments" element={<Equipments />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login"  element={<Login  />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}
