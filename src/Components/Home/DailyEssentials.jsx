import React from "react";
import Header from "../Ui/Header";
import SquaresmallCards from "../Ui/SquaresmallCards";

const DailyEssentials = () => {
  return (
    <div className="container">
      <Header
        heading={"Daily"}
        spanText={"Essentials"}
        moreRightText={"View All"}
      />
      <div
        className="pb-30 grid grid-flow-col auto-cols-[187px] gap-4 overflow-x-auto
        md:grid-flow-row md:grid-cols-[repeat(auto-fill,187px)] md:justify-center no-scrollbar"
      >
        <SquaresmallCards
          image={"/veg.png"}
          title={"Daily Essentials"}
          price={"Save up to 80%"}
        />
        <SquaresmallCards
          image={"/bag.png"}
          title={"Vegitable"}
          price={"Save up to 40%"}
        />
        <SquaresmallCards
          image={"/frts.png"}
          title={"Fruites"}
          price={"Save up to 60%"}
        />
        <SquaresmallCards
          image={"/straw.png"}
          title={"Daily Essentials"}
          price={"Save up to 20%"}
        />
        <SquaresmallCards
          image={"/mango.png"}
          title={"Mango"}
          price={"Save up to 10%"}
        />
        <SquaresmallCards
          image={"/veg.png"}
          title={"Daily Essentials"}
          price={"Save up to 80%"}
        />
      </div>
    </div>
  );
};

export default DailyEssentials;
