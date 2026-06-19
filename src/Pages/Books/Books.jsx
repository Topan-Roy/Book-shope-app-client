import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router";
import { FaRegHeart, FaHeart, FaStar, FaSearch, FaUndo, FaShoppingCart } from "react-icons/fa";
import useAxios from "../../Hook/useAxios";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import CartToast from "../../Components/CartToast/CartToast";

const Books = () => {
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  // Filter States
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState(""); // "", "under20", "20to50", "50to100", "over100"
  const [minRating, setMinRating] = useState(0); // 0, 5, 4, 3, 2

  // Sync state from author page redirect
  useEffect(() => {
    if (location.state?.searchAuthor) {
      setSearchText(location.state.searchAuthor);
    }
  }, [location]);

  // Toast and Wishlist States
  const [toast, setToast] = useState(null); // { book }
  const [wishlistedIds, setWishlistedIds] = useState({});

  // Fetch Books
  useEffect(() => {
    axiosPublic
      .get("/books")
      .then((res) => {
        setBooks(res.data);
        setAllBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Apply Filters
  useEffect(() => {
    let filtered = [...allBooks];

    // 🔍 Search Filter (Title or Author)
    if (searchText.trim() !== "") {
      filtered = filtered.filter((b) =>
        b.author.toLowerCase().includes(searchText.toLowerCase()) ||
        b.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 📂 Category Filter
    if (category !== "") {
      filtered = filtered.filter((b) => b.category === category);
    }

    // 💰 Price Range Filter
    if (priceRange !== "") {
      if (priceRange === "under20") {
        filtered = filtered.filter((b) => parseFloat(b.price) < 20);
      } else if (priceRange === "20to50") {
        filtered = filtered.filter((b) => parseFloat(b.price) >= 20 && parseFloat(b.price) <= 50);
      } else if (priceRange === "50to100") {
        filtered = filtered.filter((b) => parseFloat(b.price) >= 50 && parseFloat(b.price) <= 100);
      } else if (priceRange === "over100") {
        filtered = filtered.filter((b) => parseFloat(b.price) > 100);
      }
    }

    // ⭐ Minimum Rating Filter
    if (minRating > 0) {
      filtered = filtered.filter((b) => parseFloat(b.rating) >= minRating);
    }

    setBooks(filtered);
  }, [searchText, category, priceRange, minRating, allBooks]);

  const handleResetFilters = () => {
    setSearchText("");
    setCategory("");
    setPriceRange("");
    setMinRating(0);
  };

  const handleWishlistToggle = (e, bookId, title) => {
    e.preventDefault();
    e.stopPropagation();
    const current = !!wishlistedIds[bookId];
    setWishlistedIds((prev) => ({ ...prev, [bookId]: !current }));
    Swal.fire({
      icon: "success",
      title: current ? "Removed from Wishlist" : "Added to Wishlist",
      text: current ? `${title} removed.` : `${title} added.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

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
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 bg-gray-50/50 min-h-screen text-left">
      {/* Custom Cart Toast */}
      {toast && (
        <CartToast book={toast.book} onClose={() => setToast(null)} />
      )}

      {/* Top Search Bar Row */}
      <div className="flex justify-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search by title or author name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm shadow-inner bg-gray-50/50"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Filters Sidebar */}
        <aside className="w-full lg:w-64 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shrink-0">
          
          {/* CATEGORY */}
          <div className="mb-6">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">Category</h4>
            <select
              className="w-full border border-gray-200 px-3 py-2 rounded-xl text-slate-700 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Popular Books">Popular Books</option>
              <option value="Religious Books">Religious Books</option>
              <option value="Child Books">Child Books</option>
            </select>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* PRICE RANGE */}
          <div className="mb-6">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">Price Range</h4>
            <div className="space-y-2.5">
              {[
                { label: "All Prices", value: "" },
                { label: "Under $20", value: "under20" },
                { label: "$20 - $50", value: "20to50" },
                { label: "$50 - $100", value: "50to100" },
                { label: "Over $100", value: "over100" },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3 text-slate-600 cursor-pointer text-sm font-medium hover:text-slate-800 transition-colors">
                  <input
                    type="radio"
                    name="priceRange"
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500/20 border-gray-300"
                    checked={priceRange === item.value}
                    onChange={() => setPriceRange(item.value)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* MINIMUM RATING */}
          <div className="mb-6">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">Minimum Rating</h4>
            <div className="space-y-2.5">
              {[
                { label: "5.0 & Up", value: 5 },
                { label: "4.0 & Up", value: 4 },
                { label: "3.0 & Up", value: 3 },
                { label: "2.0 & Up", value: 2 },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3 text-slate-600 cursor-pointer text-sm font-medium hover:text-slate-800 transition-colors">
                  <input
                    type="radio"
                    name="minRating"
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500/20 border-gray-300"
                    checked={minRating === item.value}
                    onChange={() => setMinRating(item.value)}
                  />
                  <div className="flex items-center gap-1 text-orange-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < item.value ? "text-orange-400" : "text-gray-200"}
                      />
                    ))}
                    <span className="text-slate-500 text-xs ml-1 font-semibold">{item.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* Reset button */}
          <button
            onClick={handleResetFilters}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 hover:border-red-300 text-red-500 bg-red-50/50 hover:bg-red-50 font-semibold rounded-xl text-xs transition-all duration-200"
          >
            <FaUndo size={11} /> Reset All Filters
          </button>
        </aside>

        {/* Right Books Grid Area */}
        <main className="flex-1">
          {books.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
              <p className="text-gray-400 text-base font-medium">No books match your active filters.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 text-teal-600 hover:text-teal-700 font-bold text-sm underline underline-offset-4"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {books.map((b) => {
                const originalPrice = (parseFloat(b.price) * 1.1).toFixed(2);
                return (
                  <Link
                    key={b._id}
                    to={`/book/${b._id}`}
                    className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="h-60 rounded-xl bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
                        <img
                          src={b.img}
                          alt={b.title}
                          className="max-h-full max-w-full object-contain drop-shadow group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Wishlist button */}
                        <button
                          onClick={(e) => handleWishlistToggle(e, b._id, b.title)}
                          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-105 transition-all z-10"
                        >
                          {wishlistedIds[b._id] ? (
                            <FaHeart className="text-red-500 text-sm" />
                          ) : (
                            <FaRegHeart className="text-sm" />
                          )}
                        </button>
                      </div>

                      {/* Author */}
                      <p className="text-xs text-teal-600 font-semibold mt-4 mb-1 hover:underline truncate">
                        {b.author}
                      </p>

                      {/* Title */}
                      <h3 className="font-extrabold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[40px] mb-2">
                        {b.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-0.5 text-orange-400 text-[10px] mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.round(b.rating) ? "text-orange-400" : "text-gray-200"}
                          />
                        ))}
                        <span className="text-slate-400 text-xs ml-1 font-medium">({b.rating})</span>
                      </div>
                    </div>

                    <div>
                      {/* Price and Cart Row */}
                      <div className="flex items-center justify-between border-t border-gray-50 pt-3.5 mt-2">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-black text-slate-900">৳{b.price}</span>
                            <span className="text-slate-400 line-through text-xs">৳{originalPrice}</span>
                          </div>
                        </div>

                        {/* Add to cart icon button */}
                        <button
                          onClick={(e) => handleAddToCart(e, b)}
                          className="w-9 h-9 rounded-xl bg-teal-50 hover:bg-teal-500 text-teal-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                          title="Add to Cart"
                        >
                          <FaShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {books.length > 0 && (
            <div className="flex gap-3 justify-center py-10 mt-6">
              <button className="px-4 py-2 border rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-600">Previous</button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold">1</button>
              <button className="px-4 py-2 border rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-600">2</button>
              <button className="px-4 py-2 border rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-600">Next</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Books;
