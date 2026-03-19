import React from "react";

const SquaresmallCards = ({ image, price, title }) => {
  return (
    <div className="container ">
      <div className="flex flex-col items-center gap-2">
        <div className="w-46.75 h-46.75 bg-slate-100 flex items-center rounded-xl  hover:shadow-xl transition-all ease-linear duration-150 cursor-pointer">
          <img src={image} alt="" className="w-auto max-w-full" />
        </div>
        <p className="text-primary">{title}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default SquaresmallCards;
