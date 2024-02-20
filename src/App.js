import React from "react";
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inscription from "./components/incription/inscription";
import Connection from "./components/connection/connection";
import Accueil from "./components/accueil/Accueil";
import Produits from "./components/produits/Produits";
import Panier from "./components/panier/Cart";
import Contact from "./components/contact/Contact";
import Profile from "./components/profile/Profile";
import PageAdmin from "./components/PageAdmin/PageAdmin";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pageadmin" element={<PageAdmin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
