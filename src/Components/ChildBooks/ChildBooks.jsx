import React, { useContext, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import { FaStar, FaTimes, FaShoppingCart, FaBookOpen, FaChild } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import { AuthContext } from "../../Contexts/AuthProvider";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";
import CartToast from "../CartToast/CartToast";

const ChildBooks = ({ childBooks }) => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [selectedBook, setSelectedBook] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [toast, setToast] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleAddToCart = (book) => {
    if (!user || !user.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to add books to cart.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    setAddingToCart(true);
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
          setSelectedBook(null);
        }
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "Failed", text: "Could not add to cart." });
      })
      .finally(() => setAddingToCart(false));
  };



  if (!childBooks) return <Loading />;

  return (
    <div className="mb-20 bg-[#fff8f0] px-2 py-4">

      {/* Custom Cart Toast */}
      {toast && (
        <CartToast book={toast.book} onClose={() => setToast(null)} />
      )}

      {/* Header */}
      <div className="flex px-4 items-center justify-between mb-8">
        <h2 className="text-xl lg:text-4xl font-semibold text-black flex items-center gap-3">
          <span className="text-orange-500">
            <FaChild />
          </span>
          Children's Books
        </h2>
        <div className="border-t-2 border-orange-200 w-[20%] md:w-[55%] lg:w-[60%] mt-1"></div>
        <div>
          <Link to="/books">
            <button className="btn rounded-3xl bg-orange-500 text-white px-8 hover:bg-orange-600 transition-colors">
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* Slider */}
      <div className="slider-container px-4">
        {childBooks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <FaChild className="text-5xl mx-auto mb-3 text-orange-200" />
            <p className="text-lg font-medium">No children's books available yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {(showAll ? childBooks : childBooks.slice(0, 10)).map((book) => (
                <div key={book._id} className="h-[410px]">
                  <div
                    onClick={() => setSelectedBook(book)}
                    className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col cursor-pointer group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-52">
                      <img
                        className="w-full h-full object-cover p-2 group-hover:scale-105 transition-transform duration-300"
                        src={book.img}
                        alt={book.title}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                          <FaBookOpen className="text-sm" /> View Details
                        </span>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="px-4 py-2 flex-grow bg-white">
                      <p className="text-gray-500 text-xs">
                        <strong>Author:</strong> {book.author}
                      </p>
                      <p className="font-bold text-gray-800 text-base mt-1 mb-1 truncate">
                        {book.title}
                      </p>
                      <div className="flex justify-between mb-2 mt-1">
                        <p className="text-orange-500 text-sm font-bold">৳{book.price}</p>
                        <p className="text-gray-500 flex items-center gap-1 text-sm">
                          {book.rating} <FaStar className="text-orange-400" />
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs">
                        <strong>Category:</strong> {book.category}
                      </p>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="px-4 pb-4 bg-white">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(book); }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 w-full rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart className="text-sm" /> ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {childBooks.length > 10 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn rounded-3xl bg-orange-500 hover:bg-orange-600 border-none text-white px-10 py-2 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {showAll ? "Less" : "More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ===== Book Details Modal ===== */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedBook(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors shadow-md"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Book Image Panel */}
              <div className="md:w-2/5 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-8 min-h-64">
                <img
                  src={selectedBook.img}
                  alt={selectedBook.title}
                  className="max-h-72 w-auto object-contain rounded-xl shadow-lg"
                />
              </div>

              {/* Book Info Panel */}
              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {selectedBook.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-gray-800 leading-tight mb-2">
                    {selectedBook.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    by <span className="font-semibold text-gray-700">{selectedBook.author}</span>
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(selectedBook.rating) ? "text-orange-400" : "text-gray-200"}
                        size={16}
                      />
                    ))}
                    <span className="text-gray-400 text-sm ml-1">({selectedBook.rating}/5)</span>
                  </div>

                  {selectedBook.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                      {selectedBook.description}
                    </p>
                  )}

                  {selectedBook.stock && (
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-semibold text-green-600">✓ In Stock</span>{" "}
                      — {selectedBook.stock} copies available
                    </p>
                  )}
                </div>

                {/* Price + Button */}
                <div className="border-t border-gray-100 pt-5 mt-4">
                  <p className="text-3xl font-extrabold text-orange-500 mb-4">
                    ৳{selectedBook.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(selectedBook)}
                    disabled={addingToCart}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl font-bold text-base shadow-md hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {addingToCart ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <FaShoppingCart />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildBooks;
