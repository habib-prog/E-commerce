import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price * 83);

const Payment = () => {
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
    <section className="container  px-4 py-8 sm:px-6 sm:py-12 lg:px-4 lg:py-14">
      <div className="rounded-[32px] bg-white/70 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-5 mt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
          <div className="rounded-[28px] border border-primary/15 bg-white p-5 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Secure Checkout
            </p>
            <h1 className="mt-3 text-2xl font-bold text-slate-800 sm:text-3xl">
              Payment Details
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Cardholder Name"
                className="rounded-2xl border border-primary/15 px-4 py-3 outline-none"
              />
              <input
                type="text"
                placeholder="Card Number"
                className="rounded-2xl border border-primary/15 px-4 py-3 outline-none"
              />
              <input
                type="text"
                placeholder="MM/YY"
                className="rounded-2xl border border-primary/15 px-4 py-3 outline-none"
              />
              <input
                type="text"
                placeholder="CVV"
                className="rounded-2xl border border-primary/15 px-4 py-3 outline-none"
              />
              <input
                type="text"
                placeholder="Billing Address"
                className="rounded-2xl border border-primary/15 px-4 py-3 outline-none sm:col-span-2"
              />
            </div>

            <button
              type="button"
              className="mt-8 w-full rounded-2xl bg-brand px-5 py-3 font-semibold text-white"
            >
              Confirm Payment
            </button>
          </div>

          <div className="rounded-[28px] border border-primary/15 bg-third p-5 sm:p-7">
            <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
            <p className="mt-2 text-sm text-primary">{totalQuantity} item(s)</p>

            {cartItems.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-primary/20 bg-white px-4 py-8 text-center">
                <p className="text-primary">No items available for payment.</p>
                <Link
                  to="/"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-white sm:w-auto"
                >
                  Go Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-6 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:gap-4"
                    >
                      <div className="h-16 w-16 rounded-xl bg-slate-100 p-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-slate-800">
                          {item.title}
                        </p>
                        <p className="text-sm text-primary">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-brand">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-primary/15 pt-4">
                  <div className="flex items-center justify-between text-sm text-primary">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-primary">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-lg font-bold text-slate-800">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
