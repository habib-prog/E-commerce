import React from "react";

import ProductCard from "../Ui/ProductCard";
import Header from "../Ui/Header";

const BestDeal = () => {
  return (
    <section className="sm:py-18 py-14 ">
      {/* Heading start */}
      <div className="container ">
        <Header
          heading={"Grab the best deal on"}
          spanText={"Smartphones"}
          moreRightText={"View All"}
        />
        {/* cards section start */}
        <div
          className="grid grid-flow-col auto-cols-[227px] gap-4 overflow-x-auto pb-4 
                  md:grid-flow-row md:grid-cols-[repeat(auto-fill,227px)] md:justify-center no-scrollbar"
        >
          <ProductCard
            image={"/Mobile.png"}
            title={"Galaxy S22 Ultra"}
            currentPrice={"₹32999"}
            OldPrice={"₹74999"}
            save={"Save - ₹32999"}
          />
          <ProductCard
            image={"/Mobile.png"}
            title={"Galaxy S22 Ultra"}
            currentPrice={"₹32999"}
            OldPrice={"₹74999"}
            save={"Save - ₹32999"}
          />
          <ProductCard
            image={"/image 3.png"}
            title={"Galaxy S22 Ultra"}
            currentPrice={"₹32999"}
            OldPrice={"₹74999"}
            save={"Save - ₹32999"}
          />
          <ProductCard
            image={"/iphone.png"}
            title={"Iphone 16 pro"}
            currentPrice={"₹10,2999"}
            OldPrice={"₹10,3999"}
            save={"Save - ₹10000"}
          />
          <ProductCard
            image={"/Mobile.png"}
            title={"Galaxy S22 Ultra"}
            currentPrice={"₹32999"}
            OldPrice={"₹74999"}
            save={"Save - ₹32999"}
          />
        </div>
        <p className="text-brand text-center sm:hidden">Swip to view</p>
        {/* cards section end */}
      </div>
      {/* Heading Ended */}
    </section>
  );
};

export default BestDeal;
