import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import {
  useAddToCartMutation,
  useGetAllProductsQuery,
  useGetProductsCategoryQuery,
} from "../API/apiSlice";
import ProductCard from "../Components/Ui/ProductCard";
import Header from "../Components/Ui/Header";
import { addItemToCart } from "../Store/cartSlice";
import { getSearchRelevanceScore, matchesSearchTerm } from "../utils/search";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price * 83);

const getOriginalPrice = (price, discountPercentage) =>
  (price * 100) / (100 - discountPercentage);

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? "";
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("featured");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [addToCart] = useAddToCartMutation();
  const { data, isLoading, isError } = useGetAllProductsQuery({
    limit: 100,
    skip: 0,
  });
  const { data: categories = [] } = useGetProductsCategoryQuery();

  const products = useMemo(() => data?.products ?? [], [data?.products]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim();

    return products
      .filter((product) => {
        const searchableFields = [
          product.title,
          product.brand,
          product.category,
        ];
        const matchesSearch = matchesSearchTerm(query, searchableFields);
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((firstProduct, secondProduct) => {
        if (query) {
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

          if (firstScore !== secondScore) return secondScore - firstScore;
        }

        if (sortBy === "price-low") return firstProduct.price - secondProduct.price;
        if (sortBy === "price-high") return secondProduct.price - firstProduct.price;
        if (sortBy === "rating") return secondProduct.rating - firstProduct.rating;
        if (sortBy === "discount") {
          return secondProduct.discountPercentage - firstProduct.discountPercentage;
        }
        return 0;
      });
  }, [maxPrice, products, searchTerm, selectedCategory, sortBy]);

  const handleSearchChange = (value) => {
    if (value.trim()) {
      setSearchParams({ search: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setSortBy("featured");
    setSearchParams({});
  };

  const handleAddCart = async (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(addItemToCart(product));

    try {
      await addToCart({
        userId: 1,
        products: [{ id: product.id, quantity: 1 }],
      }).unwrap();
    } catch (error) {
      console.error("Add to cart failed", error);
    }

    navigate("/cart");
  };

  return (
    <section className="container   py-8 sm:py-10">
      <div className="mt-10">
        <Header
          heading={"All"}
          spanText={"Products"}
          moreRightText={`${filteredProducts.length} Items`}
          Linkto={"/products"}
        />
      </div>

      <div className="mb-6 grid gap-3 rounded-2xl border border-primary/10 bg-third p-4 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-end">
        <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          Search
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search products..."
            className="h-11 rounded-xl border border-primary/10 bg-white px-4 text-sm font-normal normal-case tracking-normal text-gray-700 outline-none focus:border-brand"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          Category
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-11 rounded-xl border border-primary/10 bg-white px-3 text-sm font-normal normal-case tracking-normal text-gray-700 outline-none focus:border-brand"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace("-", " ")}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          Max Price: ${maxPrice}
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="h-11 accent-brand"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          Sort
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-11 rounded-xl border border-primary/10 bg-white px-3 text-sm font-normal normal-case tracking-normal text-gray-700 outline-none focus:border-brand"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="discount">Best Discount</option>
          </select>
        </label>

        <button
          type="button"
          onClick={clearFilters}
          className="h-11 rounded-xl border border-brand px-4 text-sm font-bold text-brand transition hover:bg-brand hover:text-white"
        >
          Clear
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-[320px] animate-pulse rounded-2xl border border-primary/20 bg-slate-100"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-red-500">
          Products could not be loaded right now.
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-16 text-center text-sm font-bold uppercase tracking-widest text-gray-400">
          No products match your search and filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 p-4 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {filteredProducts.map((product) => {
            const originalPrice = getOriginalPrice(
              product.price,
              product.discountPercentage,
            );
            const savedAmount = originalPrice - product.price;

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.thumbnail}
                altText={product.title}
                title={product.title}
                price={product.price}
                currentPrice={formatPrice(product.price)}
                OldPrice={formatPrice(originalPrice)}
                save={`Save - ${formatPrice(savedAmount)}`}
                btntext={"Add Cart"}
                onAddCart={handleAddCart}
                to={`/products/${product.id}`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AllProducts;
