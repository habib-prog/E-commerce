import React from "react";
import Header from "../Ui/Header";

const ShopFromTop = () => {
  return (
    <section className="container">
      <div>
        <Header
          heading={"Shop From "}
          spanText={"Top Categories"}
          moreRightText={"View All"}
        />
      </div>
    </section>
  );
};

export default ShopFromTop;
