import { useEffect } from "react";
import { FaDollarSign, FaStar } from "react-icons/fa";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../Components/Loading/Loading";

const PopularBooks = ({ popularBooks }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  if (!popularBooks) {
    return <Loading />;
  }

  return (
    <div className="my-4 md:my-8 lg:mt-20 lg:mb-20">
      {/* Header */}
      <div className="flex px-4 items-center justify-between mb-8">
        <h2 className="text-xl lg:text-4xl font-semibold text-black">
          Popular Books
        </h2>
        <div className="border-t-2 border-gray-300 w-[25%] md:w-[60%] lg:w-[65%] mt-4"></div>

        <Link to="/books">
          <button className="btn rounded-3xl bg-[#F65D4E] text-white px-8">
            View All
          </button>
        </Link>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-2">
        <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularBooks.map((book) => (
            <div
              key={book._id}
              data-aos="fade-up"
              className="transition h-fit duration-500 w-full font-sans overflow-hidden mx-auto mt-4 px-4 pt-4"
            >
              {/* Image */}
              <img
                src={book.img}
                className="w-56 h-72 object-cover rounded-xl mb-3 hover:scale-105 transition-transform"
              />

              {/* Details */}
              <p className="text-sm text-gray-600 mb-1 font-medium">
                {book.author}
              </p>

              <Link to={`/books/details/${book._id}`}>
                <h2 className="text-lg md:text-xl text-gray-800 font-bold hover:text-teal-500 line-clamp-2">
                  {book.title}
                </h2>
              </Link>

              <p className="flex items-center mt-2 text-gray-800 font-semibold">
                Ratings: {book.rating}
                <FaStar className="text-orange-400 ml-1 text-xs md:text-xl" />
              </p>

              <h3 className="my-2 flex items-center">
                <FaDollarSign className="text-xl text-teal-500" />
                <span className="text-xl md:text-2xl text-teal-500 font-semibold">
                  {book.price}
                </span>
              </h3>
            </div>
          ))}
        </div>

        {/* Side Offer Image */}
        <div className="col-span-1 relative">
          <img
            className="h-72 md:h-96 lg:h-full object-cover w-full rounded-xl hover:scale-105 transition-transform"
            src="https://i.ibb.co/7Cqj9df/h1-banner1.jpg"
          />
          <div className="absolute bottom-4 lg:bottom-24 left-1/3 md:left-1/2 lg:left-16 text-white space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold">Best Offer</h2>
            <h1 className="text-3xl md:text-5xl font-bold">Save $15</h1>
            <p>on selected items</p>
            <button className="btn rounded-3xl bg-white text-black px-8">
              See more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularBooks;
