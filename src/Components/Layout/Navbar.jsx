import React, { Children } from "react";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";

const Navbar = () => {
  const categories = [
    {
      title: "Phone",
      to: "",
      children: ["Iphone", "Samsung", "One Plus", "Pixel", "Nothing Phone"],
    },
    {
      title: "Watch",
      to: "",
      children: ["Apple", "Samsung", "One Plus", "Google", "Xiaomi", "Fitbit"],
    },
    {
      title: "TWS",
      to: "",
      children: ["Apple", "Samsung", "One Plus", "Google", "Xiaomi", "Oramio"],
    },
    {
      title: "Laptop",
      to: "",
      children: ["Macbook", "Samsung", "Asus", "Lenevo", "Hp", "Dell", "MSI"],
    },
    {
      title: "Cooler",
      to: "",
      children: ["Deep Cool LS520", "Crossair"],
    },
  ];
  return (
    <header>
      <nav className="py-5">
        <div className="container flex justify-between items-center ">
          <Link to="/">
            <img src="/logo.png" alt="logo" />
          </Link>
          <div className="search flex items-center p-2 gap-2  rounded-lg bg-[#F3F9FB] w-full max-w-126.75">
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
      {/* Products category Started */}
      <div>
        <div className="container flex gap-2">
          {categories.map((item) => (
            <div key={item.title} className="relative group">
              <Link className="hover:bg-brand hover:text-white font-medium bg-third px-3 py-2  rounded-2xl inline-block ">
                <div className="flex items-center gap-1">
                  <p>{item.title}</p>
                  <BiChevronDown className="text-2xl" />
                </div>
              </Link>
              <ul className=" absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 w-48 p-2 transition rounded-2xl space-y-2 text-base text-primary font-medium bg-themey shadow">
                {item.children.map((child) => (
                  <li key={child}>
                    <Link className=" p-2  rounded-2xl hover:bg-brand hover:text-white block">
                      {child}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Products category Ended */}
    </header>
  );
};

export default Navbar;
