import React from "react";
import Header from "../Ui/Header";
import SquaresmallCards from "../Ui/SquaresmallCards";

const dailyEssentials = [
  {
    image: "/veg.png",
    title: "Daily Essentials",
    price: "Save up to 80%",
    to: "/category/groceries",
  },
  {
    image: "/bag.png",
    title: "Vegetables",
    price: "Save up to 40%",
    to: "/products?search=vegetable",
  },
  {
    image: "/frts.png",
    title: "Fruits",
    price: "Save up to 60%",
    to: "/products?search=fruit",
  },
  {
    image: "/straw.png",
    title: "Strawberry",
    price: "Save up to 20%",
    to: "/products?search=strawberry",
  },
  {
    image: "/mango.png",
    title: "Mango",
    price: "Save up to 10%",
    to: "/products?search=mango",
  },
  {
    image: "/veg.png",
    title: "Groceries",
    price: "Save up to 80%",
    to: "/category/groceries",
  },
];

const DailyEssentials = () => {
  return (
    <div>
      <div className="container">
        <Header
          heading={"Daily"}
          spanText={"Essentials"}
          moreRightText={"View All"}
          Linkto={"/category/groceries"}
        />
        <div
          className="pb-30 grid grid-flow-col auto-cols-[187px] gap-4 overflow-x-auto
        md:grid-flow-row md:grid-cols-[repeat(auto-fill,187px)] md:justify-center no-scrollbar"
        >
          {dailyEssentials.map((item) => (
            <SquaresmallCards
              key={item.title}
              image={item.image}
              title={item.title}
              price={item.price}
              to={item.to}
            />
          ))}
        </div>
      </div>
      <div className="sm:hidden mb-22">
        <p className="text-brand text-center text-sm font-medium italic">
          ← Swipe to view →
        </p>
      </div>
    </div>
  );
};

export default DailyEssentials;
