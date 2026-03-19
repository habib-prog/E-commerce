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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };
  return (
    <div className="slider-container container electronics-slider">
      <Slider {...settings}>
        <div className="px-3">
          <img src="/air.png" alt="" />
        </div>
        <div className="px-3">
          <img src="/eid2.png" alt="" />
        </div>
        <div className="px-3">
          <img src="/star.png" alt="" />
        </div>
        <div className="px-3">
          <img src="/air.png" alt="" />
        </div>
        <div className="px-3">
          <img src="/eid2.png" alt="" />
        </div>
        <div className="px-3">
          <img src="/star.png" alt="" />
        </div>
      </Slider>
    </div>
  );
}

export default MultipleItems;
