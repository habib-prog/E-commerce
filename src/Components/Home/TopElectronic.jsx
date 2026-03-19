import React from "react";
import Header from "../Ui/Header";
import ElectronicsSlider from "./ElectronicsSlider";

const TopElectronic = () => {
  return (
    <div className="container">
      <Header
        heading={"Top"}
        spanText={"Electronic Brands"}
        moreRightText={"View All"}
      />
      <div className="pb-30">
        <ElectronicsSlider />
      </div>
    </div>
  );
};

export default TopElectronic;
