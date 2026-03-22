import { useState } from "react";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { useGetProductsCategoryQuery } from "../../API/apiSlice";

const Navbar = () => {
  const [Sidebaropen, setSidebarOpen] = useState(false);
  // const categories = [
  //   //  ["Iphone", "Samsung", "One Plus", "Pixel", "Nothing Phone"]
  //   {
  //     title: "Phone",
  //     to: "",
  //     children: [
  //       {
  //         title: "Iphone",
  //         to: "",
  //       },
  //       {
  //         title: "Samsung",
  //         to: "",
  //       },
  //       {
  //         title: "One Plus",
  //         to: "",
  //       },
  //       {
  //         title: "Pixel",
  //         to: "",
  //       },
  //       {
  //         title: "Nothing Phone",
  //         to: "",
  //       },
  //     ],
  //   },
  //   {
  //     // ["Apple", "Samsung", "One Plus", "Google", "Xiaomi", "Fitbit"]
  //     title: "Watch",
  //     to: "",
  //     children: [
  //       {
  //         title: "Apple",
  //         to: "",
  //       },
  //       {
  //         title: "Samsung",
  //         to: "",
  //       },
  //       {
  //         title: "One Plus",
  //         to: "",
  //       },
  //       {
  //         title: "Google",
  //         to: "",
  //       },
  //       {
  //         title: "Xiaomi",
  //         to: "",
  //       },
  //       {
  //         title: "Fitbit",
  //         to: "",
  //       },
  //     ],
  //   },
  //   {
  //     // ["Apple", "Samsung", "One Plus", "Google", "Xiaomi", "Oramio"]
  //     title: "TWS",
  //     to: "",
  //     children: [
  //       {
  //         title: "Apple",
  //         to: "",
  //       },
  //       {
  //         title: "Samsung",
  //         to: "",
  //       },
  //       {
  //         title: "One Plus",
  //         to: "",
  //       },
  //       {
  //         title: "Google",
  //         to: "",
  //       },
  //       {
  //         title: "Xiaomi",
  //         to: "",
  //       },
  //       {
  //         title: "Oramio",
  //         to: "",
  //       },
  //     ],
  //   },
  //   {
  //     // ["Macbook", "Samsung", "Asus", "Lenevo", "Hp", "Dell", "MSI"]
  //     title: "Laptop",
  //     to: "",
  //     children: [
  //       {
  //         title: "Macbook",
  //         to: "",
  //       },
  //       {
  //         title: "Samsung",
  //         to: "",
  //       },
  //       {
  //         title: "Asus",
  //         to: "",
  //       },
  //       {
  //         title: "Lenevo",
  //         to: "",
  //       },
  //       {
  //         title: "Hp",
  //         to: "",
  //       },
  //       {
  //         title: "Dell",
  //         to: "",
  //       },
  //       {
  //         title: "MSI",
  //         to: "",
  //       },
  //     ],
  //   },
  //   {
  //     //  ["Deep Cool LS520", "Crossair"]
  //     title: "Cooler",
  //     to: "",
  //     children: [
  //       {
  //         title: "Deep Cool LS520",
  //         to: "",
  //       },
  //       {
  //         title: "Crossair",
  //         to: "",
  //       },
  //     ],
  //   },
  // ];
  const { data: Categorylist } = useGetProductsCategoryQuery();
  return (
    <header>
      <nav className="py-5">
        <div className="container flex justify-between items-center ">
          <button onClick={() => setSidebarOpen(true)} className="sm:hidden">
            <FaBars className="text-primary text-2xl " />
          </button>
          <Link to="/" className="inline-block sm:w-auto w-36">
            <img className="w-full" src="/logo.png" alt="logo" />
          </Link>
          {/* Desktop Navigation Bar Started */}
          <div className="search hidden sm:flex items-center p-2 gap-2  rounded-lg bg-[#F3F9FB] w-full sm:ml-22   max-w-126.75">
            <CiSearch />
            <input
              className="outline-none flex-1  "
              type="text"
              placeholder="Search essentials, groceries and more..."
            />
          </div>
          {/* Desktop Navigation Bar Ended */}
          <div className="auth md:ml-12 flex items-center gap-10">
            <Link
              to="/login"
              className=" hidden md:flex   text-base items-center font-bold gap-1.5 text-primary relative after:absolute after:h-full after:w-0.5 after:bg-primary after:top-0 after:-right-5"
            >
              <FaRegUser className="text-brand text-xl" />
              <span className="max-[1024px]:hidden inline">
                Sign IN / Sign Up
              </span>
            </Link>
            <Link
              to="cart"
              className="flex md:mr-5 text-base items-center text-primary font-bold gap-1.5"
            >
              <IoCartOutline className="text-brand  text-2xl" />
              <span className="hidden sm:block"> Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile search start */}
        <div className="container flex justify-center items-center sm:hidden">
          <div className="search mt-4  flex items-center p-2 gap-2  rounded-lg bg-[#F3F9FB] w-full max-w-126.75">
            <CiSearch />
            <input
              className="outline-none flex-1  "
              type="text"
              placeholder="Search essentials, groceries and more..."
            />
          </div>
        </div>
        {/* Mobile search end */}
      </nav>
      {/* Products category Started */}
      <div className="p-4 border-third border-y   relative  z-50  ">
        <div className=" container flex gap-2  overflow-x-auto no-scrollbar">
          {Categorylist?.map((items, index) => (
            <div
              className="bg-brand rounded-xl  text-white text-nowrap px-2 py-1 "
              key={index}
            >
              {items}
            </div>
          ))}
        </div>
      </div>
      {/* Products category Ended */}

      {/* MOBILE NAVBAR START */}

      <div
        className={`fixed top-0 left-0 w-full h-screen z-50 transition-all duration-700 ${
          Sidebaropen
            ? "bg-primary/40 visible opacity-100"
            : "bg-transparent invisible opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className="bg-themey overflow-y-auto w-4/5 sm:w-3/5 h-full p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="  text-primary pb-3 top-0 p-2  border-b fixed bg-white  w-50 mb-12  border-secodary flex justify-between">
            <h5 className="text-xl text-primary">Menu Sidebar</h5>
            <button onClick={() => setSidebarOpen(false)} className="text-2xl">
              <IoIosCloseCircle />
            </button>
          </div>
          <ul className=" space-y-4 text-primary mt-12  z-50 font-bold text-base mb-5 pb-4 border-secodary border-b">
            {Categorylist?.map((list, index) => (
              <li key={index}>{list}</li>
            ))}
          </ul>
          <Link
            to="/login"
            onClick={() => setSidebarOpen(false)}
            className=" md:flex text-base items-center font-primary gap-1.5 text-primary "
          >
            Sign Up / Sign in
          </Link>
        </div>
      </div>

      {/* MOBILE NAVBAR END */}
    </header>
  );
};

export default Navbar;
