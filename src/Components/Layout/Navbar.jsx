import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import {
  useGetAllProductsQuery,
  useGetProductsCategoryQuery,
} from "../../API/apiSlice";
import { logoutUser } from "../../Store/authSlice";
import { getSearchRelevanceScore, matchesSearchTerm } from "../../utils/search";

const SEARCH_HISTORY_KEY = "ecommerce-search-history";
const MAX_SEARCH_HISTORY = 8;

const getStoredSearchHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) ?? [];
  } catch {
    return [];
  }
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Sidebaropen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState(getStoredSearchHistory);
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
  const { data: productsData } = useGetAllProductsQuery({
    limit: 100,
    skip: 0,
  });
  const products = useMemo(
    () => productsData?.products ?? [],
    [productsData?.products],
  );
  const searchSuggestions = useMemo(() => {
    const query = searchTerm.trim();

    if (!query) return [];

    const productSuggestions = products
      .filter((product) =>
        matchesSearchTerm(query, [product.title, product.brand, product.category]),
      )
      .sort((firstProduct, secondProduct) => {
        const firstScore = getSearchRelevanceScore(query, [
          firstProduct.title,
          firstProduct.brand,
          firstProduct.category,
        ]);
        const secondScore = getSearchRelevanceScore(query, [
          secondProduct.title,
          secondProduct.brand,
          secondProduct.category,
        ]);

        return secondScore - firstScore;
      })
      .map((product) => ({
        id: `product-${product.id}`,
        label: product.title,
        meta: product.category?.replace("-", " ") ?? "Product",
        value: product.title,
      }));

    const categorySuggestions = (Categorylist ?? [])
      .filter((category) => matchesSearchTerm(query, [category]))
      .sort(
        (firstCategory, secondCategory) =>
          getSearchRelevanceScore(query, [secondCategory]) -
          getSearchRelevanceScore(query, [firstCategory]),
      )
      .map((category) => ({
        id: `category-${category}`,
        label: category.replace("-", " "),
        meta: "Category",
        value: category.replace("-", " "),
      }));

    const uniqueSuggestions = [...productSuggestions, ...categorySuggestions].filter(
      (suggestion, index, suggestions) =>
        suggestions.findIndex(
          (item) => item.value.toLowerCase() === suggestion.value.toLowerCase(),
        ) === index,
    );

    return uniqueSuggestions.slice(0, 6);
  }, [Categorylist, products, searchTerm]);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setSidebarOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();

    if (query) {
      saveSearchHistory(query);
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setSearchTerm("");
      setIsSearchFocused(false);
    } else {
      navigate("/products");
    }
  };

  const saveSearchHistory = (query) => {
    const nextHistory = [
      query,
      ...searchHistory.filter(
        (item) => item.toLowerCase() !== query.toLowerCase(),
      ),
    ].slice(0, MAX_SEARCH_HISTORY);

    setSearchHistory(nextHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory));
  };

  const deleteSearchHistory = (query) => {
    const nextHistory = searchHistory.filter((item) => item !== query);

    setSearchHistory(nextHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory));
  };

  const runHistorySearch = (query) => {
    saveSearchHistory(query);
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchTerm("");
    setIsSearchFocused(false);
  };

  const runSuggestedSearch = (query) => {
    saveSearchHistory(query);
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchTerm("");
    setIsSearchFocused(false);
  };

  const searchSuggestionsDropdown =
    isSearchFocused && searchTerm.trim() && searchSuggestions.length > 0 ? (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-primary/10 bg-white shadow-2xl">
        <div className="border-b border-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary">
          Suggestions
        </div>
        {searchSuggestions.map((item) => (
          <button
            key={item.id}
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
              runSuggestedSearch(item.value);
            }}
            className="flex w-full items-center justify-between gap-3 border-b border-primary/5 px-3 py-2 text-left text-sm text-primary last:border-b-0 hover:bg-third"
          >
            <span className="truncate font-medium">{item.label}</span>
            <span className="shrink-0 text-xs capitalize text-primary/60">
              {item.meta}
            </span>
          </button>
        ))}
      </div>
    ) : null;

  const searchHistoryDropdown =
    isSearchFocused && !searchTerm.trim() && searchHistory.length > 0 ? (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-primary/10 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary">
          <span>Recent Searches</span>
          <button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
              setSearchHistory([]);
              localStorage.removeItem(SEARCH_HISTORY_KEY);
            }}
            className="text-brand"
          >
            Clear All
          </button>
        </div>
        {searchHistory.map((item) => (
          <div
            key={item}
            className="flex items-center border-b border-primary/5 last:border-b-0"
          >
            <button
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                runHistorySearch(item);
              }}
              className="flex-1 px-3 py-2 text-left text-sm text-primary hover:bg-third"
            >
              {item}
            </button>
            <button
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                deleteSearchHistory(item);
              }}
              className="px-3 py-2 text-lg text-primary hover:text-brand"
              aria-label={`Delete ${item} from search history`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <header>
      <div className="hidden bg-brand py-2 text-white md:block">
        <div className="container flex items-center justify-between gap-4 text-sm">
          <p>Call Us: +880 1234-567890</p>
          <p>Order No: TRACK-ECOM-2026</p>
        </div>
      </div>
      <nav className="py-5">
        <div className="container flex justify-between items-center ">
          <button onClick={() => setSidebarOpen(true)} className="sm:hidden">
            <FaBars className="text-primary text-2xl " />
          </button>
          <Link to="/" className="inline-block sm:w-auto w-36">
            <img className="w-full" src="/logo.png" alt="logo" />
          </Link>
          {/* Desktop Navigation Bar Started */}
          <form
            onSubmit={handleSearchSubmit}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 120)}
            className="search relative hidden sm:flex items-center p-2 gap-2 rounded-lg bg-[#F3F9FB] w-full sm:ml-22 max-w-126.75"
          >
            <CiSearch />
            <input
              className="outline-none flex-1"
              type="search"
              autoComplete="off"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search essentials, groceries and more..."
            />
            {searchSuggestionsDropdown}
            {searchHistoryDropdown}
          </form>
          {/* Desktop Navigation Bar Ended */}
          <div className="auth md:ml-12 flex items-center gap-10">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3 text-primary relative after:absolute after:h-full after:w-0.5 after:bg-primary after:top-0 after:-right-5">
                <FaRegUser className="text-brand text-xl" />
                <div className="max-[1024px]:hidden">
                  <p className="text-xs text-primary/70">Hello</p>
                  <Link to="/profile" className="text-sm font-bold text-primary hover:text-brand">
                    {user?.firstName ?? user?.username ?? "User"}
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-brand px-3 py-1 text-sm font-semibold text-brand"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className=" hidden md:flex   text-base items-center font-bold gap-1.5 text-primary relative after:absolute after:h-full after:w-0.5 after:bg-primary after:top-0 after:-right-5"
              >
                <FaRegUser className="text-brand text-xl" />
                <span className="max-[1024px]:hidden inline">
                  Sign IN / Sign Up
                </span>
              </Link>
            )}
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
          <form
            onSubmit={handleSearchSubmit}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 120)}
            className="search relative mt-4 flex items-center p-2 gap-2 rounded-lg bg-[#F3F9FB] w-full max-w-126.75"
          >
            <CiSearch />
            <input
              className="outline-none flex-1"
              type="search"
              autoComplete="off"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search essentials, groceries and more..."
            />
            {searchSuggestionsDropdown}
            {searchHistoryDropdown}
          </form>
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
          {isAuthenticated ? (
            <div className="space-y-3">
              <Link to="/profile" onClick={() => setSidebarOpen(false)} className="block text-primary font-semibold">
                {user?.firstName ?? user?.username ?? "User"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setSidebarOpen(false)}
              className=" md:flex text-base items-center font-primary gap-1.5 text-primary "
            >
              Sign Up / Sign in
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE NAVBAR END */}
    </header>
  );
};

export default Navbar;
