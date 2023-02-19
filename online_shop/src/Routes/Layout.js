import { Outlet } from "react-router-dom";
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";

export const DefaultLayout = () => (
  <>
    <Outlet />
  </>
);

export const AuthLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
