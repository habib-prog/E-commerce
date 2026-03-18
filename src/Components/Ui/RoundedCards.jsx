import React from "react";

const RoundedCards = ({ image, title }) => {
  return (
    <div className="container">
      <div className=" w-32 text-center space-y-2 ">
        <div className="flex hover:border-brand hover:border cursor-pointer items-center justify-center flex-col gap-2 bg-slate-100 h-32 w-32 rounded-full">
          <img
            src={image}
            alt=""
            className="w-auto max-w-full hover:shadow-xl transition-all duration-500 ease-linear rounded-full"
          />
        </div>
        <p className="text-primary">{title}</p>
      </div>
    </div>
  );
};

export default RoundedCards;
