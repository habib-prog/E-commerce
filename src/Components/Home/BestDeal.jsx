import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  useAddToCartMutation,
  useGetProductsByCategoryQuery,
} from "../../API/apiSlice";
import { addItemToCart } from "../../Store/cartSlice";
import ProductCard from "../Ui/ProductCard";
import Header from "../Ui/Header";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price * 83);

const getOriginalPrice = (price, discountPercentage) =>
  (price * 100) / (100 - discountPercentage);

const BestDeal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [addToCart] = useAddToCartMutation();
  const { data, isLoading, isError } = useGetProductsByCategoryQuery({
    category: "smartphones",
    limit: 5,
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
    <section className="sm:py-18 py-14 ">
      {/* Heading start */}
      <div className="container ">
        <Header
          heading={"Grab the best deal on"}
          spanText={"Smartphones"}
          moreRightText={"View All"}
          Linkto={"/category/smartphones"}
        />
        {/* cards section start */}
        {isLoading ? (
          <div className="grid grid-flow-col auto-cols-[227px] gap-4 overflow-x-auto pb-4 md:grid-flow-row md:grid-cols-[repeat(auto-fill,227px)] md:justify-center no-scrollbar">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-[330px] max-w-56 animate-pulse rounded-2xl border border-primary/20 bg-slate-100"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-500">
            Products could not be loaded right now.
          </div>
        ) : (
          <div
            className="grid grid-flow-col auto-cols-[227px] gap-4 overflow-x-auto pb-4 
                  md:grid-flow-row md:grid-cols-[repeat(auto-fill,227px)] md:justify-center no-scrollbar"
          >
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
        <p className="text-brand text-center sm:hidden">Swip to view</p>
        {/* cards section end */}
      </div>
      {/* Heading Ended */}
    </section>
  );
};

export default BestDeal;
