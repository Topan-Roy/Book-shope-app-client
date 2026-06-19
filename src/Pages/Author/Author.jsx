import React, { useEffect, useState } from "react";
import { FaPenNib, FaBookOpen, FaSearch, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hook/useAxios";

const Author = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const authorsPerPage = 8;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
    });
    axiosPublic
      .get("/books")
      .then((res) => {
        const authorMap = {};
        res.data.forEach((book) => {
          if (book.author) {
            authorMap[book.author] = (authorMap[book.author] || 0) + 1;
          }
        });

        const uniqueAuthors = Object.keys(authorMap).map((authorName) => ({
          name: authorName,
          bookCount: authorMap[authorName],
        }));

        setAuthors(uniqueAuthors);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const filteredAuthors = authors.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);
  const startIndex = (currentPage - 1) * authorsPerPage;
  const currentAuthors = filteredAuthors.slice(
    startIndex,
    startIndex + authorsPerPage
  );

  const handleAuthorClick = (authorName) => {
    navigate("/books", { state: { searchAuthor: authorName } });
  };

  const getAvatarGradient = (name) => {
    const gradients = [
      "from-teal-500 via-emerald-400 to-cyan-500",
      "from-orange-500 via-amber-400 to-yellow-500",
      "from-blue-600 via-indigo-500 to-violet-500",
      "from-pink-500 via-rose-400 to-red-500",
      "from-purple-600 via-fuchsia-500 to-pink-500",
      "from-cyan-500 via-sky-400 to-blue-600",
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return gradients[sum % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 pb-20 text-left">
      
      {/* Premium Creative Banner Section */}
      <div className="relative overflow-hidden bg-[#0f172a] text-white py-24 px-4">
        {/* Abstract shapes & glowing light effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-widest border border-teal-500/20 mb-6 backdrop-blur-sm animate-pulse">
            <FaPenNib className="text-xs" /> Meet the Creators
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
            Discover Our <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">Elite Authors</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed mb-10">
            Explore the brilliant minds behind our best-selling collections. Dive into stories, knowledge, and worlds crafted by authors globally.
          </p>

          {/* Connected search bar inside banner container */}
          <div className="flex justify-center max-w-xl mx-auto">
            <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-1.5 backdrop-blur-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-900/60 pl-12 pr-4 py-3.5 rounded-xl border border-transparent text-white placeholder-slate-400 focus:outline-none focus:bg-slate-900 focus:border-teal-500/40 transition-all text-sm"
                placeholder="Search author name to browse their books..."
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Intro block / Creative Synergy */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16">
        
        {/* Authors Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentAuthors.length > 0 ? (
            currentAuthors.map((author, idx) => (
              <div
                key={idx}
                onClick={() => handleAuthorClick(author.name)}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                className="group relative bg-white border border-gray-100/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center cursor-pointer overflow-hidden"
              >
                {/* Decorative background element on hover */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Avatar with pastel glowing gradients */}
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${getAvatarGradient(author.name)} flex items-center justify-center text-white font-black text-3xl shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 relative`}>
                  {author.name.charAt(0)}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow border border-gray-50 flex items-center justify-center text-teal-600">
                    <FaPenNib size={10} />
                  </div>
                </div>

                <h3 className="mt-6 font-extrabold text-slate-800 text-lg text-center group-hover:text-teal-600 transition-colors leading-tight px-2">
                  {author.name}
                </h3>
                
                {/* Custom modern badges for stats */}
                <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-4 py-1.5 rounded-2xl shadow-inner border border-teal-100/30">
                  <FaBookOpen className="text-xs" /> {author.bookCount} {author.bookCount === 1 ? "Book" : "Books"}
                </div>

                {/* Go to shop arrow indicator */}
                <span className="mt-5 text-[11px] font-bold text-slate-400 group-hover:text-teal-600 flex items-center gap-1 transition-colors uppercase tracking-wider">
                  View Books <FaChevronRight size={8} />
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-slate-400 font-semibold text-lg">No authors matching your search.</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 text-teal-600 font-bold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-2.5">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-11 h-11 rounded-2xl text-sm font-extrabold transition-all duration-300 ${
                  currentPage === idx + 1
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20 scale-105"
                    : "bg-white border border-gray-200 text-slate-600 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Author;
