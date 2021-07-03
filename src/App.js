import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { commerce } from "./lib/commerce";

import NavBar from "./components/Navbar/Navbar";
import { Products, Cart, Checkout } from "./page";

export default function App() {
  const dispatch = useDispatch();
  // const [cart, setCart] = useState({});
  const [order, setOrder] = useState();
  const [errorMessage, setErrorMessage] = useState();

  // const handleAddToCart = async (productId, quantity) => {
  //   const item = await commerce.cart.add(productId, quantity);
  //   console.log(item);
  //   setCart(item.cart);
  // };

  // const handleUpdateCart = async (productId, quantity) => {
  //   const { cart } = await commerce.cart.update(productId, { quantity });

  //   setCart(cart);
  // };

  // const handleRemoveCart = async (productId) => {
  //   const { cart } = await commerce.cart.remove(productId);

  //   setCart(cart);
  // };

  // const handleEmptyCart = async () => {
  //   const { cart } = await commerce.cart.empty();

  //   setCart(cart);
  // };

  // const refreshCart = async () => {
  //   const newCart = await commerce.cart.refresh();
  //   setCart(newCart);
  // };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      // refreshCart();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route exact path="/cart">
          <Cart
          // cart={cart}
          // onUpdateCart={handleUpdateCart}
          // onRemoveCart={handleRemoveCart}
          // onEmptyCart={handleEmptyCart}
          />
        </Route>
        <Route exact path="/checkout">
          <Checkout
            // cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          />
        </Route>
      </Switch>
    </Router>
  );
}
