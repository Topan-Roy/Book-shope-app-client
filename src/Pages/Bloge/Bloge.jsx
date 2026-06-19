import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaUserEdit, FaBookReader } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";

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
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 text-left">
      {/* Blog Hero Banner */}
      <div className="relative overflow-hidden bg-[#0f172a] text-white py-20 px-4">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-widest border border-teal-500/20 mb-6">
            Insights & Ideas
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            The Book House <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            Stay updated with the latest literary trends, reviews, writing tips, and publisher stories curated by our editorial team.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        {/* Editor's Profile / Introduction Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0">
            <img
              src="https://i.ibb.co.com/yj93nHG/image.png"
              alt="Editorial Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm uppercase font-extrabold tracking-wider text-teal-600 mb-1">
              Editorial Board
            </h4>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              Our community is led by a group of passionate editors, authors, and critics who review thousands of books annually to bring you the best recommendations.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Blog Image */}
                <div className="h-56 overflow-hidden relative bg-slate-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={blog.image}
                    alt={blog.title}
                  />
                  <span className="absolute top-4 left-4 bg-teal-500 text-white text-[9px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-full shadow-md">
                    Article
                  </span>
                </div>

                {/* Info and Titles */}
                <div className="p-6">
                  {/* Meta date / author */}
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-semibold mb-3">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt size={11} className="text-teal-500" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaUserEdit size={11} className="text-teal-500" />
                      {blog.author}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-lg leading-snug group-hover:text-teal-600 transition-colors line-clamp-2 mb-2">
                    {blog.title}
                  </h3>

                  {/* Snippet preview */}
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {blog.content ? blog.content[0] : "Read the full article to discover all details, reviews, and suggestions on this topic."}
                  </p>
                </div>
              </div>

              {/* Action Button Row */}
              <div className="px-6 pb-6 pt-2">
                <Link to={`/bloge/blogdetails/${blog.id}`} className="block">
                  <button className="w-full bg-teal-50 hover:bg-teal-500 text-teal-600 hover:text-white font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs shadow-sm hover:shadow-md">
                    <FaBookReader size={12} /> Continue Reading
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bloge;
