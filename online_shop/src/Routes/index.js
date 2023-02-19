import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Account from "../Components/Account";
import Cart from "../Components/Cart";
import Dashboard from "../Components/Dashboard";
import ErrorPage from "../Components/ErrorPage";
import Invoice from "../Components/Invoice";
import Product from "../Components/Product";
import ProductDetails from "../Components/ProductDetails";
import Profile from "../Components/Profile";
import { AuthLayout, DefaultLayout } from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import OrderList from "../Components/OrdetList";

export const router = createBrowserRouter([
  {
    path: "/account",
    element: <Account />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "orderlist",
        element: (
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: "invoice/:invoiceNo",
        element: (
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "product-details/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/errors/404",
    element: (
      <DefaultLayout>
        <ErrorPage />
      </DefaultLayout>
    ),
    errorElement: <ErrorPage />,
  },
]);
