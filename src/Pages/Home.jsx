import React from "react";
import Banner from "../Components/Home/Banner";
import BestDeal from "../Components/Home/BestDeal";
import ShopFromTop from "../Components/Home/ShopFromTop";
import TopElectronic from "../Components/Home/TopElectronic";
import DailyEssentials from "../Components/Home/DailyEssentials";

const Home = () => {
  return (
    <div>
      <Banner />
      <BestDeal />
      <ShopFromTop />
      <TopElectronic />
      <DailyEssentials />
    </div>
  );
};

export default Home;
