import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const banners = [
    {
      id: 1,
      img: "https://i.ibb.co/p246TGp/adv-23042024-12-24-1735022744.jpg",
      alt: "Banner 1",
    },
    {
      id: 2,
      img: "https://i.ibb.co/X3rxMMW/adv-54712024-12-24-1735022931.jpg",
      alt: "Banner 2",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative">
            <img
              src={banner.img}
              alt={banner.alt}
              className="w-full h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] xl:h-[50vh] object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
