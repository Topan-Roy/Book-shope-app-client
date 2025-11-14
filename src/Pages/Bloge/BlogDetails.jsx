import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Sidebar from "./Sidebar";

export default function BlogDetails() {
  const { id } = useParams();
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
        console.error("Error loading blog:", err);
        setLoading(false);
      });
  }, []);

  // Selected blog
  const blog = blogs.find((b) => b.id === Number(id));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">
          Blog not found! Check the URL.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 md:px-10 py-8">
      <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">

        {/* Main Blog Content */}
        <div className="lg:w-2/3 space-y-6">
          <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full uppercase">
            Popular Blog
          </span>

          <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>

          <p className="text-gray-500 text-sm">
            Posted by <span className="font-semibold">{blog.author}</span> on {blog.date}
          </p>

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full rounded-lg shadow-md"
          />

          <div className="space-y-4">
            {blog.content?.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 w-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
