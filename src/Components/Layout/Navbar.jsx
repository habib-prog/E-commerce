import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { useGetProductsCategoryQuery } from "../../API/apiSlice";

const Navbar = () => {
  const [Sidebaropen, setSidebarOpen] = useState(false);
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  const { data: Categorylist } = useGetProductsCategoryQuery();
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );
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
              className="flex md:mr-5 text-base items-center text-primary font-bold gap-1.5 relative"
            >
              <IoCartOutline className="text-brand  text-2xl" />
              {cartCount > 0 ? (
                <span className="absolute -top-2 left-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              ) : null}
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
      <div className="p-4 border-third border-y relative z-40 group">
        <div className="container relative flex items-center">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 cursor-pointer bg-white shadow-lg p-1.5 rounded-full border border-gray-200 hover:bg-brand hover:text-white transition-all hidden sm:flex items-center justify-center"
          >
            <BiChevronLeft size={24} />
          </button>

          {/* Scrollable Category List */}
          <div
            ref={scrollRef}
            className="flex gap-1 overflow-x-auto no-scrollbar   sm:px-10 scroll-smooth"
          >
            {Categorylist?.map((items, index) => (
              <Link
                to={`/category/${items}`}
                className="bg-brand rounded-xl text-white text-nowrap px-4 py-1.5 text-sm font-medium uppercase cursor-pointer hover:brightness-110 transition-all"
                key={index}
              >
                {items}
              </Link>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 cursor-pointer bg-white shadow-lg p-1.5 rounded-full border border-gray-200 hover:bg-brand hover:text-white transition-all hidden sm:flex items-center justify-center"
          >
            <BiChevronRight size={24} />
          </button>
        </div>
      </div>
      {/* --- Products Category Section EndeD --- */}

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
              <li key={index}>
                <Link to={`/category/${list}`} onClick={() => setSidebarOpen(false)}>
                  {list}
                </Link>
              </li>
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
