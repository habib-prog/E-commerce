import React from "react";
import { Outlet } from "react-router";
import Nav from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <div className="fixed z-50 w-full bg-white">
        <Nav />
      </div>

      <div className="pt-42">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
