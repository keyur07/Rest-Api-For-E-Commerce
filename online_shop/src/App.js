import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./Routes";
import productData from "./mock/productData";
function App() {
  let productsData = localStorage.getItem("productData");
  productsData = productsData
    ? productsData
    : localStorage.setItem("productData", JSON.stringify(productData));
  return (
    <React.Fragment>
      <Toaster />

      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
