import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

// Arrow Function Started
function SampleNextArrow({ onClick }) {
  return (
    <div
      className={` sm:w-15 sm:h-15 bg-slate-100 p-1.25 rounded-full cursor-pointer absolute top-1/2  -translate-y-1/2   -right-4 sm:-right-7 z-10`}
      onClick={onClick}
    >
      <BiChevronRight className="sm:w-12.5 sm:h-12.5 bg-blue-100 rounded-full text-blue-400" />
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div
      className={` sm:w-15 sm:h-15 bg-slate-100 p-1.25 rounded-full cursor-pointer absolute top-1/2  -translate-y-1/2   -left-4 sm:-left-7 z-10`}
      onClick={onClick}
    >
      <BiChevronLeft className="sm:w-12.5 sm:h-12.5 bg-blue-100 rounded-full text-blue-400" />
    </div>
  );
}
// Arrow Function Ended

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: "linear",

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <section className="container mt-7 inline relative group:">
      <div className="container">
        <Slider {...settings}>
          <div>
            <img className="rounded-2xl " src="/star.png" alt="Banner" />
          </div>
          <div>
            <img className="rounded-2xl" src="/Eid.png" alt="Banner" />
          </div>
          <div>
            <img className="rounded-2xl" src="/eid2.png" alt="Banner" />
          </div>
          <div>
            <img className="rounded-2xl" src="/watch.png" alt="Banner" />
          </div>
          <div>
            <img className="rounded-2xl" src="/air.png" alt="Banner" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Banner;
