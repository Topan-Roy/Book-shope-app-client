import React, { useEffect, useState, useContext } from "react";
import { FaDollarSign, FaStar, FaShoppingCart, FaBookOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../Components/Loading/Loading";
import { AuthContext } from "../../Contexts/AuthProvider";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";
import CartToast from "../CartToast/CartToast";

const PopularBooks = ({ popularBooks }) => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  
  const [toast, setToast] = useState(null); // { book }
  const [addingToCartId, setAddingToCartId] = useState(null);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  if (!popularBooks) {
    return <Loading />;
  }

  const handleAddToCart = (e, book) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || !user.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to add books to cart.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    setAddingToCartId(book._id);
    const cartItem = {
      bookId: book._id,
      title: book.title,
      img: book.img,
      price: book.price,
      author: book.author,
      email: user.email,
    };

    axiosInstance
      .post("/carts", cartItem)
      .then((res) => {
        if (res.data.insertedId) {
          window.dispatchEvent(new Event("cartUpdated"));
          setToast({ book });
        }
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "Failed", text: "Could not add to cart." });
      })
      .finally(() => setAddingToCartId(null));
  };

  return (
    <div className="my-4 md:my-8 lg:mt-20 lg:mb-20 text-left">
      {/* Custom Cart Toast */}
      {toast && (
        <CartToast book={toast.book} onClose={() => setToast(null)} />
      )}

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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
        <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularBooks.map((book) => (
            <div
              key={book._id}
              data-aos="fade-up"
              onClick={() => navigate(`/book/${book._id}`)}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group h-[440px]"
            >
              <div>
                {/* Image Container */}
                <div className="relative overflow-hidden h-52 rounded-xl bg-gray-50 flex items-center justify-center p-3">
                  <img
                    src={book.img}
                    alt={book.title}
                    className="max-h-full max-w-full object-contain drop-shadow group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-teal-700 text-xs font-bold px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-md">
                      <FaBookOpen className="text-xs" /> View Details
                    </span>
                  </div>
                </div>

                {/* Details */}
                <p className="text-xs text-teal-600 font-semibold mt-4 mb-1 truncate">
                  {book.author}
                </p>

                <h3 className="font-extrabold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[40px] mb-2">
                  {book.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-orange-400 text-xs mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(book.rating) ? "text-orange-400" : "text-gray-200"}
                    />
                  ))}
                  <span className="text-slate-400 text-xs font-medium ml-1">({book.rating})</span>
                </div>
              </div>

              <div>
                {/* Price and Cart Row */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
                  <span className="text-base font-black text-slate-900">৳{book.price}</span>
                  
                  <button
                    onClick={(e) => handleAddToCart(e, book)}
                    disabled={addingToCartId === book._id}
                    className="w-9 h-9 rounded-xl bg-teal-50 hover:bg-teal-500 text-teal-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                    title="Add to Cart"
                  >
                    <FaShoppingCart size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side Offer Image */}
        <div className="col-span-1 relative h-[440px] lg:h-auto overflow-hidden rounded-2xl group">
          <img
            className="h-full w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
            src="https://i.ibb.co/7Cqj9df/h1-banner1.jpg"
            alt="Best Offer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-6 right-6 text-white space-y-2">
            <h2 className="text-xl font-bold uppercase tracking-wider text-teal-300">Best Offer</h2>
            <h1 className="text-3xl font-black">Save $15</h1>
            <p className="text-sm text-slate-200">on selected items from store</p>
            <Link to="/books" className="inline-block mt-2">
              <button className="rounded-full bg-white hover:bg-teal-500 hover:text-white text-black font-bold px-6 py-2 text-xs transition-all shadow">
                See more
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularBooks;
