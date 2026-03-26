import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeItemFromCart } from "../Store/cartSlice";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price * 83);

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <section className="container min-h-[70vh] py-6 sm:py-10">
      <div className="mb-6 flex flex-col gap-4 border-b border-primary/20 pb-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-primary">Your Shopping Cart</p>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Cart Items
          </h1>
        </div>
        <div className="w-full mt-10 text-center rounded-2xl bg-third px-4 py-3  sm:w-auto sm:px-5 ">
          <p className="text-sm text-primary">{totalQuantity} item(s)</p>
          <p className="text-lg font-bold text-brand">
            {formatPrice(totalPrice)}
          </p>
          {cartItems.length > 0 ? (
            <button
              type="button"
              onClick={() => navigate("/payment")}
              className="mt-3 w-full rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white sm:w-auto"
            >
              Purchase Now
            </button>
          ) : null}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-primary/25 px-4 py-12 text-center sm:px-6 sm:py-16">
          <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
            Your cart is empty
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-primary sm:text-base">
            Add products from the category page or best deals section.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-white sm:w-auto"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 p-2 sm:gap-5 sm:p-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl border border-primary/15 bg-white p-4 shadow-sm sm:p-5 md:flex-row md:items-center"
            >
              <div className="h-24 w-full rounded-2xl bg-slate-100 p-4 sm:h-28 md:w-32 md:shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-slate-800 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-primary">
                  Quantity: {item.quantity}
                </p>
                <p className="mt-1 font-medium text-slate-700">
                  {formatPrice(item.price)} each
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-primary/10 pt-3 sm:flex-row sm:items-center sm:justify-between md:min-w-32 md:flex-col md:items-end md:border-t-0 md:pt-0">
                <p className="text-base font-bold text-brand sm:text-lg">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <div className="grid gap-2 sm:flex sm:w-auto sm:items-center md:w-full md:grid">
                  <button
                    type="button"
                    onClick={() => navigate("/payment")}
                    className="w-full rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white sm:w-auto md:w-full"
                  >
                    Purchase
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(removeItemFromCart(item.id))}
                    className="w-full rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 sm:w-auto md:w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cart;
