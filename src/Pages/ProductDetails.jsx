import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useAddToCartMutation, useGetProductByIdQuery } from "../API/apiSlice";
import { addItemToCart } from "../Store/cartSlice";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price * 83);

const getOriginalPrice = (price, discountPercentage) =>
  (price * 100) / (100 - discountPercentage);

const normalizeGalleryImages = (images = [], fallbackImage) => {
  const baseImages = images.length ? images : [fallbackImage];
  const filledImages = [...baseImages];

  while (filledImages.length < 4) {
    filledImages.push(baseImages[filledImages.length % baseImages.length]);
  }

  return filledImages.slice(0, Math.max(4, baseImages.length));
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [addToCart] = useAddToCartMutation();
  const [quantity, setQuantity] = useState(1);
  const [mainSlider, setMainSlider] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) {
    return (
      <section className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-4">
        <div className="grid gap-6 lg:grid-cols-[120px_minmax(0,1fr)_420px]">
          <div className="hidden lg:grid gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
          <div className="h-[420px] animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-[420px] animate-pulse rounded-3xl bg-slate-100" />
        </div>
      </section>
    );
  }

  if (isError || !product) {
    return (
      <section className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-red-500">
          Product details could not be loaded right now.
        </div>
      </section>
    );
  }

  const originalPrice = getOriginalPrice(product.price, product.discountPercentage);
  const images = normalizeGalleryImages(product.images, product.thumbnail);

  const handleAddCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return false;
    }

    const cartProduct = {
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price,
      quantity,
    };

    dispatch(addItemToCart(cartProduct));

    try {
      await addToCart({
        userId: 1,
        products: [{ id: product.id, quantity }],
      }).unwrap();
    } catch (error) {
      console.error("Add to cart failed", error);
    }

    return true;
  };

  const handleBuyNow = async () => {
    const addedToCart = await handleAddCart();

    if (!addedToCart) {
      return;
    }

    navigate("/payment");
  };

  return (
    <section className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-4 lg:py-14">
      <div className="rounded-[32px] bg-white/70 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[110px_minmax(0,1fr)_420px] lg:gap-6">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-1 lg:gap-3">
              {images.slice(0, 4).map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => {
                    setActiveSlide(index);
                    mainSlider?.slickGoTo(index);
                  }}
                  className={`rounded-2xl border p-2.5 transition sm:p-3 ${
                    activeSlide === index
                      ? "border-brand bg-third"
                      : "border-primary/15 bg-slate-100"
                  }`}
                >
                  <div className="h-16 sm:h-20 lg:h-24">
                    <img
                      src={image}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="order-1 overflow-hidden rounded-[32px] border border-primary/15 bg-third p-4 sm:p-6 lg:order-2">
            <Slider
              ref={(slider) => setMainSlider(slider)}
              arrows={false}
              fade
              beforeChange={(_, nextSlide) => setActiveSlide(nextSlide)}
              className="product-main-slider"
            >
              {images.map((image, index) => (
                <div key={`${image}-${index}`}>
                  <div className="flex h-[250px] items-center justify-center sm:h-[340px] lg:h-[420px]">
                    <img
                      src={image}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="order-3 rounded-[32px] border border-primary/15 bg-white p-5 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {product.category}
            </p>
            <h1 className="mt-3 text-2xl font-bold text-slate-800 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-sm text-primary sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-third px-4 py-2 text-sm font-medium text-primary">
                Rating: {product.rating}
              </span>
              <span className="rounded-full bg-third px-4 py-2 text-sm font-medium text-primary">
                Stock: {product.stock}
              </span>
              <span className="rounded-full bg-third px-4 py-2 text-sm font-medium text-primary">
                Brand: {product.brand ?? "N/A"}
              </span>
            </div>

            <div className="mt-8 border-t border-primary/10 pt-6">
              <p className="text-3xl font-bold text-brand">
                {formatPrice(product.price)}
              </p>
              <p className="mt-2 text-sm text-primary">
                <span className="line-through">{formatPrice(originalPrice)}</span>
                <span className="ml-2 font-medium text-green-500">
                  {product.discountPercentage}% OFF
                </span>
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-slate-800">
                Quantity
              </p>
              <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-primary/15">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="px-4 py-3 text-lg font-semibold text-primary"
                >
                  -
                </button>
                <span className="min-w-14 border-x border-primary/15 px-4 py-3 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="px-4 py-3 text-lg font-semibold text-primary"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddCart}
                className="rounded-2xl border border-brand px-5 py-3 font-semibold text-brand transition hover:bg-brand hover:text-white"
              >
                Add To Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="rounded-2xl bg-brand px-5 py-3 font-semibold text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
