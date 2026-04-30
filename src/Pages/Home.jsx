import React from "react";
import Banner from "../Components/Home/Banner";
import BestDeal from "../Components/Home/BestDeal";
import ShopFromTop from "../Components/Home/ShopFromTop";
import TopElectronic from "../Components/Home/TopElectronic";
import DailyEssentials from "../Components/Home/DailyEssentials";
import LaptopAd from "../Components/Home/LaptopAd";

const Home = () => {
  return (
    <div>
      <LaptopAd />
      <Banner />
      <BestDeal />
      <ShopFromTop />
      <TopElectronic />
      <DailyEssentials />
    </div>
  );
};

export default Home;
