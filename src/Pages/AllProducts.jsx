import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAddToCartMutation, useGetAllProductsQuery } from "../API/apiSlice";
import ProductCard from "../Components/Ui/ProductCard";
import Header from "../Components/Ui/Header";
import { addItemToCart } from "../Store/cartSlice";

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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [addToCart] = useAddToCartMutation();
  const { data, isLoading, isError } = useGetAllProductsQuery({
    limit: 30,
    skip: 0,
  });

  const products = data?.products ?? [];

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
          moreRightText={`${products.length} Items`}
          Linkto={"/products"}
        />
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
      ) : (
        <div className="grid grid-cols-2 p-4 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => {
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
