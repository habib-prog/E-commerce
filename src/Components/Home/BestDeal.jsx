import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

const BestDeal = () => {
  return (
    <section className="sm:py-18 py-14 ">
      {/* Heading start */}
      <div className="container flex justify-between">
        <h1 className="heading">
          Grab the best deal on <span>Smartphones</span>
        </h1>
        <Link className="flex items-center gap-0.5 hover:text-brand">
          View All
          <IoIosArrowForward className="text-brand" />
        </Link>
      </div>
      {/* Heading Ended */}
    </section>
  );
};

export default BestDeal;
