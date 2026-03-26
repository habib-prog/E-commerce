import React from "react";
import Header from "../Ui/Header";
import RoundedCards from "../Ui/RoundedCards";

const topCategories = [
  { image: "/new.png", title: "Smartphones", slug: "smartphones" },
  { image: "/face.png", title: "Beauty", slug: "beauty" },
  { image: "/wash.png", title: "Furniture", slug: "furniture" },
  { image: "/wh.png", title: "Watches", slug: "mens-watches" },
  { image: "/bag.png", title: "Groceries", slug: "groceries" },
  { image: "/mac.png", title: "Laptops", slug: "laptops" },
  { image: "/face.png", title: "Fragrances", slug: "fragrances" },
];

const ShopFromTop = () => {
  return (
    <section className="container">
      <div>
        <Header
          heading={"Shop From "}
          spanText={"Top Categories"}
          moreRightText={"View All"}
          Linkto={"/products"}
        />
        <div className="grid grid-flow-col auto-cols-[132px] overflow-x-auto no-scrollbar md:grid-flow-row md:grid-cols-[repeat(auto-fill,132px)] gap-11 pb-30">
          {topCategories.map((category) => (
            <RoundedCards
              key={category.slug}
              image={category.image}
              title={category.title}
              to={`/category/${category.slug}`}
            />
          ))}
        </div>
        <p className="text-brand sm:hidden  text-center text-sm mb-12 font-medium italic">
          ← Swipe to view →
        </p>
      </div>
    </section>
  );
};

export default ShopFromTop;
