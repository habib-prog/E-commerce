import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

const Header = ({ heading, spanText, moreRightText, Linkto }) => {
  return (
    <div className="items center flex justify-between border-b border-primary/30 pb-4 after:absolute sm:after:w-100 after:w-36 after:h-1 after:bg-brand relative after:left-0 after:bottom-0 mb-10">
      <h1 className="heading">
        {heading} <span>{spanText}</span>
      </h1>
      <Link to={Linkto} className="flex items-center gap-0.5 hover:text-brand">
        {moreRightText}
        <IoIosArrowForward className="text-brand" />
      </Link>
    </div>
  );
};

export default Header;
