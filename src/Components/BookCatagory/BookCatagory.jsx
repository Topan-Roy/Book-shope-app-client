import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookCategory = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [bookCategory, setBookCategory] = useState([]);

  useEffect(() => {
    fetch("/category.json")
      .then((response) => response.json())
      .then((data) => setBookCategory(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="my-6 md:my-10 container mx-auto px-4">
      

      <div className="slider-container">
        <Slider {...settings}>
          {bookCategory.map((category) => (
            <div key={category.categoryName}>
              <div className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform">
                <img
                  src={category.categoryImage}
                  alt={category.categoryName}
                  className="w-14 h-14 object-contain"
                />
                <h3 className="text-sm font-medium text-gray-700 text-center">
                  {category.categoryName}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BookCategory;
