import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { IoClose } from "react-icons/io5";
import {
  useGetProductsByCategoryQuery,
  useGetProductsCategoryQuery,
} from "../../API/apiSlice";

const formatCategoryName = (category) =>
  category
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") ?? "Featured";

const LaptopAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [categorySeed] = useState(() => Math.random());
  const [productSeed] = useState(() => Math.random());
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetProductsCategoryQuery();
  const selectedCategory = useMemo(() => {
    if (!categories.length) return "";

    return categories[Math.floor(categorySeed * categories.length)];
  }, [categories, categorySeed]);
  const { data, isLoading, isError } = useGetProductsByCategoryQuery(
    {
      category: selectedCategory,
      limit: 10,
      skip: 0,
    },
    {
      skip: !selectedCategory,
    },
  );
  const products = useMemo(() => data?.products ?? [], [data?.products]);
  const featuredProduct = useMemo(() => {
    if (!products.length) return null;

    return products[Math.floor(productSeed * products.length)];
  }, [products, productSeed]);
  const categoryName = formatCategoryName(selectedCategory);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-md transition hover:bg-brand hover:text-white"
          aria-label="Close laptop offer"
        >
          <IoClose className="text-2xl" />
        </button>

        <Link
          to={
            featuredProduct
              ? `/products/${featuredProduct.id}`
              : `/category/${selectedCategory || "laptops"}`
          }
          onClick={() => setIsVisible(false)}
          className="grid min-h-[320px] md:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="flex flex-col justify-center bg-brand px-6 py-8 text-white sm:px-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-white/80">
              {categoryName} Deal
            </p>
            <h2 className="max-w-sm text-3xl font-black leading-tight sm:text-5xl">
              {featuredProduct?.title ?? "Discover a fresh deal"}
            </h2>
            <p className="mt-4 max-w-md text-sm font-medium leading-6 text-white/85 sm:text-base">
              {featuredProduct
                ? `Now available at $${featuredProduct.price}. Tap to view details.`
                : "Explore a random category deal with fast checkout."}
            </p>
            <span className="mt-7 inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-black uppercase text-brand">
              View Product
            </span>
          </div>

          <div className="flex items-center justify-center bg-slate-100 p-6">
            {isCategoriesLoading || isLoading ? (
              <div className="h-64 w-full max-w-sm animate-pulse rounded-2xl bg-slate-200" />
            ) : isError || !featuredProduct ? (
              <div className="flex h-64 w-full max-w-sm items-center justify-center rounded-2xl bg-white text-sm font-bold uppercase tracking-widest text-gray-400">
                Featured deals
              </div>
            ) : (
              <img
                src={featuredProduct.thumbnail}
                alt={featuredProduct.title}
                className="max-h-72 w-auto max-w-full object-contain"
              />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LaptopAd;
