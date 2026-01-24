import React from "react";
import { Outlet } from "react-router";
import Nav from "./Navbar";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;
