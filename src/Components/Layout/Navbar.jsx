import React from "react";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="py-5">
      <div className="container flex justify-between items-center ">
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>
        <div className="search flex items-center p-2 gap-2  rounded-lg bg-[#F3F9FB] w-full max-w-[507px]">
          <CiSearch />
          <input
            className="outline-none flex-1  "
            type="text"
            placeholder="Search essentials, groceries and more..."
          />
        </div>
        <div className="auth flex items-center gap-10">
          <Link
            to="/signin"
            className="flex text-base items-center font-bold gap-1.5 text-primary relative after:absolute after:h-full after:w-0.5 after:bg-primary after:top-0 after:-right-5"
          >
            <FaRegUser className="text-brand text-2xl" />
            Sign Up/ Sign in
          </Link>
          <Link
            to="cart"
            className="flex text-base items-center font-bold gap-1.5"
          >
            <IoCartOutline className="text-brand text-2xl" />
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
