import React from "react";
import { Link } from "react-router";

const SquaresmallCards = ({ image, price, title, to }) => {
  const content = (
    <div className="container ">
      <div className="flex flex-col items-center gap-2">
        <div className="w-46.75 h-46.75 bg-slate-100 flex items-center rounded-xl  hover:shadow-xl transition-all ease-linear duration-150 cursor-pointer">
          <img src={image} alt={title} className="w-auto max-w-full" />
        </div>
        <p className="text-primary">{title}</p>
        <p>{price}</p>
      </div>
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};

export default SquaresmallCards;
