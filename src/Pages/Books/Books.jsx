import { useEffect, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import useAxios from "../../Hook/useAxios";

const Books = () => {
  const axiosPublic = useAxios();

  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  // Filters
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");

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

    // 🔍 Search
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

    // 💰 Price Sorting
    if (priceSort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setBooks(filtered);
  }, [searchText, category, priceSort, allBooks]);

  return (
    <div className="w-full">

      {/* Banner */}
      <div
        className="w-full h-56 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/2hzVSbx/Imageby-Stanislav-Kondratievvia-Unsplash.webp')",
        }}
      ></div>

      <h1 className="text-black mt-10 text-lg md:text-xl text-center px-10">
        The Leo Baeck Institute is a non-profit organization. Any income from
        the store is supporting the institute’s activities.
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-6 justify-center">

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search author or title..."
          className="border w-72 px-4 py-2 rounded"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Category */}
        <select
          className="border px-4 py-2 rounded w-52"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Popular Books">Popular Books</option>
          <option value="Religious Books">Religious Books</option>
          <option value="Child Books">Child Books</option>
        </select>

        {/* Price Sort */}
        <select
          className="border px-4 py-2 rounded w-52"
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6">

        {books.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No books found...
          </p>
        )}

        {books.map((b) => (
          <div
            key={b._id}
            className="border rounded shadow-sm p-3 relative hover:shadow-md transition"
          >
            <img
              src={b.img}
              className="w-full h-52 object-cover rounded"
              alt=""
            />

            <button className="absolute top-3 right-3 text-red-600 text-xl">
              <FaRegHeart />
            </button>

            <p className="text-sm text-gray-500 mt-2">{b.author}</p>
            <p className="font-semibold">{b.title}</p>

            <p className="text-lg font-bold text-teal-700 mt-1">
              ${b.price}
            </p>

            <div className="flex items-center gap-1 text-yellow-500 mt-1">
              {Array(b.rating)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-3 justify-center py-6">
        <button className="px-4 py-2 border rounded">Previous</button>
        <button className="px-4 py-2 bg-teal-600 text-white rounded">1</button>
        <button className="px-4 py-2 border rounded">2</button>
        <button className="px-4 py-2 border rounded">Next</button>
      </div>
    </div>
  );
};

export default Books;
