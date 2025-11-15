import { useEffect, useState } from "react";
import { Link } from "react-router";

const Bloge = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/blog.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full md:px-10 px-4">
      <div className="relative bg-white w-full">
        {/* Banner Image */}
        <div className="w-full h-60 sm:h-80 md:h-64 relative">
          <img
            src="https://i.ibb.co.com/QjXHqBQk/IMG-0324.jpg"
            alt="Bookshelf"
            className="rounded-b-lg w-full h-[250px] object-cover"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center px-6 mt-[-35px]">
          <div className="w-16 h-16 sm:w-20 z-20 sm:h-20 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img
              src="https://i.ibb.co.com/yj93nHG/image.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl pt-10 mb-8 font-semibold text-gray-800">
          The Book House Blog
        </h1>
      </div>

      {/* Blog Cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white"
          >
            <img
              className="w-full h-60 object-cover"
              src={blog.image}
              alt={blog.title}
            />

            <div className="px-6 py-4 space-y-1">
              <h2 className="font-bold text-xl">{blog.title}</h2>

              <div className="flex justify-between text-gray-600 text-sm">
                <p>{blog.date}</p>
                <p>By {blog.author}</p>
              </div>
            </div>

            <div className="px-6 pb-4">
              <Link to={`/bloge/blogdetails/${blog.id}`}>
                <button className="bg-[#009689] hover:bg-[#007a6d] text-white font-bold py-2 px-4 rounded">
                  Continue Reading
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bloge;
