import React from "react";
import { Link } from "react-router";

const ProductCard = ({
  id,
  image,
  price,
  currentPrice,
  altText,
  OldPrice,
  title,
  save,
  btntext,
  onAddCart,
  to,
}) => {
  return (
    <div className="rounded-2xl hover:shadow-xl transition-all duration-500 ease-linear overflow-hidden  border border-primary/20 max-w-56">
      <Link to={to ?? "#"} className="block">
        <div className="bg-slate-100 flex items-center h-54 justify-center py-4 ">
          <img src={image} alt={altText} className="w-auto max-w-full" />
        </div>
        <div className="bg-white border-b border-primary/20 p-3">
          <h3>{title}</h3>
          <p>
            {currentPrice} <span className="line-through">{OldPrice}</span>
          </p>
        </div>
      </Link>
      <div className="p-2.5 flex gap-1.5 items-center justify-between">
        <p className="text-green-400">{save}</p>
        <button
          type="button"
          onClick={() =>
            onAddCart?.({
              id,
              title,
              image,
              price,
            })
          }
          className="bg-brand text-white p-1.5 rounded-md text-sm cursor-pointer"
        >
          {btntext}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
