import React from "react";
import Slider from "react-slick";

function MultipleItems() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,

    autoplay: true,
    autoplaySpeed: 1500,

    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <div className=" container electronics-slider">
      <Slider {...settings}>
        <div className="sm:px-3">
          <img src="/air.png" alt="" />
        </div>
        <div className="sm:px-3">
          <img src="/eid2.png" alt="" />
        </div>
        <div className="sm:px-3">
          <img src="/star.png" alt="" />
        </div>
        <div className="sm:px-3">
          <img src="/air.png" alt="" />
        </div>
        <div className="sm:px-3">
          <img src="/eid2.png" alt="" />
        </div>
        <div className="sm:px-3">
          <img src="/star.png" className="w-full h-auto" alt="" />
        </div>
      </Slider>
    </div>
  );
}

export default MultipleItems;
