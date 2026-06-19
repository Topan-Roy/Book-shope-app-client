import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaUserEdit, FaBookReader, FaSearch, FaPaperPlane } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";

const Bloge = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    Swal.fire({
      icon: "success",
      title: "Subscribed Successfully!",
      text: "Thank you for subscribing to our book recommendations newsletter.",
      confirmButtonColor: "#0d9488",
    });
    setEmail("");
  };

  if (loading) {
    return <Loading />;
  }

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // First blog acts as "Featured Post" (only when not searching)
  const featuredBlog = searchTerm === "" && blogs.length > 0 ? blogs[0] : null;
  const gridBlogs = featuredBlog ? filteredBlogs.slice(1) : filteredBlogs;

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
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed mb-8">
            Stay updated with the latest literary trends, reviews, writing tips, and publisher stories curated by our editorial team.
          </p>

          {/* Search bar */}
          <div className="flex justify-center max-w-lg mx-auto">
            <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-1.5 backdrop-blur-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/60 pl-12 pr-4 py-3.5 rounded-xl border border-transparent text-white placeholder-slate-400 focus:outline-none focus:bg-slate-900 focus:border-teal-500/40 transition-all text-sm"
                placeholder="Search articles by title or author name..."
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        
        {/* Featured Post Header */}
        {featuredBlog && (
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-teal-500 rounded-full inline-block" />
              Featured Article
            </h2>
            <div className="bg-white rounded-3xl border border-gray-100/80 shadow-sm overflow-hidden flex flex-col lg:flex-row hover:shadow-xl transition-all duration-300">
              <div className="w-full lg:w-1/2 h-64 lg:h-96 relative bg-slate-100 overflow-hidden">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-teal-600 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full shadow-md">
                  Editor's Choice
                </span>
              </div>
              <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-teal-500" />
                      {featuredBlog.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaUserEdit className="text-teal-500" />
                      {featuredBlog.author}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-extrabold text-slate-800 leading-snug hover:text-teal-600 transition-colors">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">
                    {featuredBlog.content ? featuredBlog.content[0] : ""}
                  </p>
                </div>
                <div className="pt-6">
                  <Link to={`/bloge/blogdetails/${featuredBlog.id}`}>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-md">
                      <FaBookReader /> Read Full Story
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-teal-500 rounded-full inline-block" />
            {searchTerm !== "" ? "Search Results" : "Latest Articles"}
          </h2>

          {gridBlogs.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-slate-400 font-semibold text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 text-teal-600 font-bold hover:underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridBlogs.map((blog) => (
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
                      <button className="w-full bg-teal-550/10 hover:bg-teal-500 text-teal-600 hover:text-white font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs shadow-sm hover:shadow-md">
                        <FaBookReader size={12} /> Continue Reading
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Subscription Panel */}
        <div className="mt-20 bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-[-30%] right-[-10%] w-80 h-80 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
            <h2 className="text-2xl md:text-4xl font-black">Never Miss an Update</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Subscribe to our newsletter to receive curated lists of bestsellers, writer interviews, and weekly literature insights directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-slate-400 text-sm backdrop-blur-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <FaPaperPlane size={12} /> Subscribe
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Bloge;
