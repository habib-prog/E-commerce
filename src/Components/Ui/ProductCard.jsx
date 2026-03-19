import React from "react";

const ProductCard = ({
  image,
  currentPrice,
  altText,
  OldPrice,
  title,
  save,
  btntext,
}) => {
  return (
    <div className="rounded-2xl hover:shadow-xl transition-all duration-500 ease-linear overflow-hidden  border border-primary/20 max-w-56">
      <div className="bg-slate-100 flex items-center h-48 justify-center py-4 ">
        <img src={image} alt={altText} className="w-auto max-w-full" />
      </div>
      <div className="bg-white border-b border-primary/20 p-3">
        <h3>{title}</h3>
        <p>
          {currentPrice} <span className="line-through">{OldPrice}</span>
        </p>
      </div>
      <div className="p-2.5 flex gap-1.5 items-center justify-between">
        <p className="text-green-400">{save}</p>
        <button className="bg-brand text-white p-1.5 rounded-md text-sm cursor-pointer">
          {btntext}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
