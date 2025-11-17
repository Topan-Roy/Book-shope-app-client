import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    img: "",
    title: "",
    author: "",
    price: "",
    rating: "",
    category: "",
    description: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !bookData.img ||
      !bookData.title ||
      !bookData.author ||
      !bookData.price ||
      !bookData.rating ||
      !bookData.category ||
      !bookData.description ||
      !bookData.stock
    ) {
      return Swal.fire("Error!", "All fields are required!", "error");
    }

    try {
      const res = await axios.post("http://localhost:3000/books", bookData);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Book Added Successfully!", "success");

        setBookData({
          img: "",
          title: "",
          author: "",
          price: "",
          rating: "",
          category: "",
          description: "",
          stock: "",
        });
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong!", "error");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">➕ Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Image */}
        <div>
          <label className="font-semibold">Book Image URL</label>
          <input
            type="text"
            name="img"
            value={bookData.img}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Author */}
        <div>
          <label className="font-semibold">Author</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Enter book description"
            rows="3"
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {/* Stock */}
        <div>
          <label className="font-semibold">Books Available (pcs)</label>
          <input
            type="number"
            name="stock"
            value={bookData.stock}
            onChange={handleChange}
            placeholder="Enter available stock"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price ($)</label>
          <input
            type="number"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="font-semibold">Rating (1–5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={bookData.rating}
            onChange={handleChange}
            placeholder="Rating 1-5"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            name="category"
            value={bookData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Popular Books">Popular</option>
            <option value="Religious Books">Religious</option>
            <option value="Child Books">Child</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
