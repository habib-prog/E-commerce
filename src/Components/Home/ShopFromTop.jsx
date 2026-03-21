import React from "react";
import Header from "../Ui/Header";
import RoundedCards from "../Ui/RoundedCards";

const ShopFromTop = () => {
  return (
    <section className="container">
      <div>
        <Header
          heading={"Shop From "}
          spanText={"Top Categories"}
          moreRightText={"View All"}
        />
        <div className="grid grid-flow-col auto-cols-[132px] overflow-x-auto no-scrollbar md:grid-flow-row md:grid-cols-[repeat(auto-fill,132px)] gap-11 pb-30">
          <RoundedCards image={"/wh.png"} title={"Smart Watch"} />
          <RoundedCards image={"/face.png"} title={"Face Wash"} />
          <RoundedCards image={"/wash.png"} title={"Washing Machine"} />
          <RoundedCards image={"/wh.png"} title={"Smart Watch"} />
          <RoundedCards image={"/new.png"} title={"Mobile"} />
          <RoundedCards image={"/face.png"} title={"Face Wash"} />

          <RoundedCards image={"/wh.png"} title={"Smart Watch"} />
        </div>
        <p className="text-brand text-center text-sm mb-12 font-medium italic">
          ← Swipe to view →
        </p>
      </div>
    </section>
  );
};

export default ShopFromTop;
