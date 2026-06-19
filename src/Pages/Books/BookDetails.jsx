import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import { FaStar, FaRegHeart, FaHeart, FaShoppingCart, FaArrowLeft, FaCheck, FaTruck, FaBook, FaShieldAlt } from "react-icons/fa";
import useAxios from "../../Hook/useAxios";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import CartToast from "../../Components/CartToast/CartToast";

const BookDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [addingToCart, setAddingToCart] = useState(false);
  const [toast, setToast] = useState(null); // { book }
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/books`)
      .then((res) => {
        const foundBook = res.data.find((b) => b._id === id);
        setBook(foundBook);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book not found!</h2>
        <Link to="/books" className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition">
          Back to Books
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user || !user.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to add books to cart.",
        confirmButtonColor: "#0d9488",
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

    axiosPublic
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
      .finally(() => setAddingToCart(false));
  };

  const toggleWishlist = () => {
    setWishlisted(!wishlisted);
    Swal.fire({
      icon: "success",
      title: wishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      text: wishlisted ? `${book.title} has been removed.` : `${book.title} has been added.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Mock view count and discount calculations
  const originalPrice = (parseFloat(book.price) * 1.1).toFixed(2);
  const discountPercent = "10%";

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Custom Cart Toast */}
      {toast && (
        <CartToast book={toast.book} onClose={() => setToast(null)} />
      )}

      {/* Hero Header Section */}
      <div className="bg-[#0f172a] text-white pt-10 pb-16 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/20 to-slate-900/40 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link to="/books" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium mb-8 transition-colors">
            <FaArrowLeft /> Back to Shop
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
            
            {/* Book Image Cover Panel */}
            <div className="flex flex-col items-center">
              <div className="w-64 md:w-80 h-96 bg-slate-800 rounded-2xl p-6 shadow-2xl flex items-center justify-center relative border border-slate-700/50 group">
                <img
                  src={book.img}
                  alt={book.title}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <span className="mt-4 px-6 py-1.5 rounded-full bg-teal-500/20 text-teal-400 text-sm font-semibold border border-teal-500/30">
                Featured Book
              </span>
            </div>

            {/* Book Info Panel */}
            <div className="flex-1 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
                {book.category || "General"}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                {book.title}
              </h1>
              
              {/* Rating and Info badges */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(book.rating) ? "text-orange-400" : "text-slate-600"}
                      size={18}
                    />
                  ))}
                  <span className="font-semibold text-white ml-1">{book.rating}/5</span>
                </div>
                <span className="text-slate-500">•</span>
                <span>(12 reviews)</span>
                <span className="text-slate-500">•</span>
                <span>124 views</span>
                <span className="text-slate-500">•</span>
                <span>45 sold</span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-slate-900/60 p-6 rounded-xl border border-slate-800/80 mb-8 max-w-2xl">
                <div>
                  <p className="text-slate-400 text-xs uppercase font-medium">Author</p>
                  <p className="text-teal-400 font-bold mt-1 text-sm md:text-base">{book.author}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase font-medium">Publisher</p>
                  <p className="text-slate-200 font-semibold mt-1 text-sm md:text-base">Penguin Random House</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase font-medium">Edition</p>
                  <p className="text-slate-200 font-semibold mt-1 text-sm md:text-base">1st Edition (2024)</p>
                </div>
              </div>

              {/* Price & Cart Container */}
              <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-2xl">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-black text-slate-900">৳{book.price}</span>
                    <span className="text-slate-400 line-through text-sm">৳{originalPrice}</span>
                    <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded border border-red-100">
                      {discountPercent} OFF
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse" />
                    In Stock — Available: {book.stock || 5} copies
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="flex-1 md:flex-initial bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {addingToCart ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaShoppingCart /> Add To Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={toggleWishlist}
                    className={`p-3.5 rounded-xl border transition-all duration-200 ${
                      wishlisted
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-gray-50 border-gray-200 text-slate-500 hover:bg-gray-100"
                    }`}
                    title="Add to Wishlist"
                  >
                    {wishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 mt-12">
        <div className="border-b border-gray-200 flex gap-6 text-sm md:text-base font-semibold">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 transition-all ${
              activeTab === "description" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`pb-3 transition-all ${
              activeTab === "details" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 transition-all ${
              activeTab === "reviews" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Reviews (12)
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-8 text-left">
          {activeTab === "description" && (
            <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
              <h3 className="text-xl font-bold text-slate-800">Book Summary & Description</h3>
              <p>{book.description || "No description available for this book yet. Please check back later."}</p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Product Specifications</h3>
              <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-6 py-3.5 text-sm font-semibold text-gray-500 w-1/3">Title</th>
                      <td className="px-6 py-3.5 text-sm text-gray-800">{book.title}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-3.5 text-sm font-semibold text-gray-500">Author</th>
                      <td className="px-6 py-3.5 text-sm text-gray-800">{book.author}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-6 py-3.5 text-sm font-semibold text-gray-500">Category</th>
                      <td className="px-6 py-3.5 text-sm text-gray-800">{book.category}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-3.5 text-sm font-semibold text-gray-500">Publisher</th>
                      <td className="px-6 py-3.5 text-sm text-gray-800">Penguin Random House</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-6 py-3.5 text-sm font-semibold text-gray-500">Available Stock</th>
                      <td className="px-6 py-3.5 text-sm text-gray-800">{book.stock || 5} copies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800">Customer Feedbacks</h3>
              
              {/* Review card */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Topan Roy</h4>
                    <span className="text-xs text-gray-400">June 20, 2026</span>
                  </div>
                  <div className="flex items-center text-orange-400 text-xs">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Highly recommended! The book is written in very simple language and has many useful actionable takeaways. The quality of the pages is also very good.
                </p>
              </div>

              {/* Review 2 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Al-Amin</h4>
                    <span className="text-xs text-gray-400">June 18, 2026</span>
                  </div>
                  <div className="flex items-center text-orange-400 text-xs">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  It teaches wonderful strategies for building habits. Very fast shipping, received the book in 2 days. Satisfied.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
