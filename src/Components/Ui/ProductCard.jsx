import React from "react";

const ProductCard = ({
  image,
  currentPrice,
  altText,
  OldPrice,
  title,
  save,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden  border border-primary/20 max-w-56">
      <div className="bg-slate-100 flex items-center h-48 justify-center py-4 ">
        <img src={image} alt={altText} className="w-auto max-w-full" />
      </div>
      <div className="bg-white border-b border-primary/20 p-3">
        <h3>{title}</h3>
        <p>
          {currentPrice} <span className="line-through">{OldPrice}</span>
        </p>
      </div>
      <div className="p-2.5">
        <p className="text-green-400">{save}</p>
      </div>
    </div>
  );
};

export default ProductCard;
