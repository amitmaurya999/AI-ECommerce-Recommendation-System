import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { CartProvider } from "./context/CartContext";

import { BrowserRouter } from "react-router-dom";

import { WishlistProvider } from "./context/WishlistContext";

import { Toaster } from "react-hot-toast";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
        <App />
        
         <Toaster position="top-right" />

        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);