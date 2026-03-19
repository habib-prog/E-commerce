import { useState } from "react";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState("");
  const [Sidebaropen, setSidebarOpen] = useState(false);
  const categories = [
    //  ["Iphone", "Samsung", "One Plus", "Pixel", "Nothing Phone"]
    {
      title: "Phone",
      to: "",
      children: [
        {
          title: "Iphone",
          to: "",
        },
        {
          title: "Samsung",
          to: "",
        },
        {
          title: "One Plus",
          to: "",
        },
        {
          title: "Pixel",
          to: "",
        },
        {
          title: "Nothing Phone",
          to: "",
        },
      ],
    },
    {
      // ["Apple", "Samsung", "One Plus", "Google", "Xiaomi", "Fitbit"]
      title: "Watch",
      to: "",
      children: [
        {
          title: "Apple",
          to: "",
        },
        {
          title: "Samsung",
          to: "",
        },
        {
          title: "One Plus",
          to: "",
        },
        {
          title: "Google",
          to: "",
        },
        {
          title: "Xiaomi",
          to: "",
        },
        {
          title: "Fitbit",
          to: "",
        },
      ],
    },
    {
      // ["Apple", "Samsung", "One Plus", "Google", "Xiaomi", "Oramio"]
      title: "TWS",
      to: "",
      children: [
        {
          title: "Apple",
          to: "",
        },
        {
          title: "Samsung",
          to: "",
        },
        {
          title: "One Plus",
          to: "",
        },
        {
          title: "Google",
          to: "",
        },
        {
          title: "Xiaomi",
          to: "",
        },
        {
          title: "Oramio",
          to: "",
        },
      ],
    },
    {
      // ["Macbook", "Samsung", "Asus", "Lenevo", "Hp", "Dell", "MSI"]
      title: "Laptop",
      to: "",
      children: [
        {
          title: "Macbook",
          to: "",
        },
        {
          title: "Samsung",
          to: "",
        },
        {
          title: "Asus",
          to: "",
        },
        {
          title: "Lenevo",
          to: "",
        },
        {
          title: "Hp",
          to: "",
        },
        {
          title: "Dell",
          to: "",
        },
        {
          title: "MSI",
          to: "",
        },
      ],
    },
    {
      //  ["Deep Cool LS520", "Crossair"]
      title: "Cooler",
      to: "",
      children: [
        {
          title: "Deep Cool LS520",
          to: "",
        },
        {
          title: "Crossair",
          to: "",
        },
      ],
    },
  ];

  return (
    <header>
      {/* <div className="bg-slate-50 w-full px-2 py-2 fixed sm:block lg:hidden hidden ">
        <div className="wraper  flex justify-between container text-primary">
          <div>
            <p>Welcome to worldwide Megamart!</p>
          </div>
          <div>
            <p>Arriving Soon!</p>
          </div>
        </div>
      </div> */}
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
              to="/signin"
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
      <div className="p-4 border-third border-y   relative hidden z-50 md:block ">
        <div className=" container flex gap-2">
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
                  <li key={child.title}>
                    <Link
                      to={child.to}
                      className=" p-2  rounded-2xl hover:bg-brand hover:text-white block"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
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
          <div className="  text-primary pb-3 border-b border-secodary flex justify-between">
            <h5 className="text-xl text-primary">Menu Sidebar</h5>
            <button onClick={() => setSidebarOpen(false)} className="text-2xl">
              <IoIosCloseCircle />
            </button>
          </div>
          <ul className=" space-y-4 text-primary z-50 font-bold text-base mb-5 pb-4 border-secodary border-b">
            {categories.map((items) => (
              <li key={items.title}>
                <div className="flex justify-between">
                  <Link onClick={() => setOpen(items.title)} to={items.to}>
                    {items.title}
                  </Link>
                  <button
                    className="text-3xl cursor-pointer"
                    onClick={() => setOpen(items.title)}
                  >
                    <BiChevronRight />
                  </button>
                </div>

                <ul
                  className={` ${open === items.title ? "block" : "hidden"}   font-semibold pl-2 space-y-2 mt-2 text-base`}
                >
                  {items.children.map((child) => (
                    <li key={child.title}>
                      <Link>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Link
            to="/signin"
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
