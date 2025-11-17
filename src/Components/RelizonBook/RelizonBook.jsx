import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";


const RelizonBook = ({ religiousBooks }) => {


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (!religiousBooks) {
    return <Loading />;
  }

  return (
    <div className="mb-20 bg-[#f7f6f6] px-2 py-4">
      {/* Header */}
      <div className="flex px-4 items-center justify-between mb-8">
        <h2 className="text-xl lg:text-4xl font-semibold text-black">
          Religious Books
        </h2>
        <div className="border-t-2 border-gray-300 w-[25%] md:w-[60%] lg:w-[65%] mt-4"></div>
        <div>
          <Link to="/books">
            <button className="btn rounded-3xl bg-[#F65D4E] text-white px-8">
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* Slider */}
      <div className="slider-container px-4">
        <Slider {...settings}>
          {religiousBooks.map((book) => (
            <div key={book._id} className="p-2 h-[410px]">
              <div className="rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                {/* Image */}
                <img
                  className="w-full h-52 object-cover p-2"
                  src={book.img}
                  alt={book.title}
                />

                {/* Details */}
                <div className="px-4 py-2 flex-grow">
                  <p className="text-gray-600 text-sm">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <Link
                    to={`/books/ditales/${book._id}`}
                    className="font-bold hover:underline text-xl mb-1 block"
                  >
                    {book.title}
                  </Link>
                  <div className="flex justify-between mb-2 mt-2">
                    <p className="text-teal-500 text-sm">
                      <strong>Price:</strong> ${book.price}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1 text-sm">
                      <strong>Rating:</strong> {book.rating}{" "}
                      <FaStar className="text-orange-400" />
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm">
                    <strong>Category:</strong> {book.category}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <div className="px-4 pb-4">
                  <button
                   
                    className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RelizonBook;
