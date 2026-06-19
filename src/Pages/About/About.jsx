import { useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";
import { FaStore, FaBook, FaMailBulk, FaHandsHelping } from "react-icons/fa";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 text-left">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-[#0f172a] text-white py-20 px-4">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-widest border border-teal-500/20 mb-6">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            About <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">The Bookistry</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            Welcome to Dhaka's premier sanctuary for book lovers. Learn about our mission to support local bookstores and ignite curiosity.
          </p>
        </div>
      </div>

      {/* Main Content Info Block */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
          {/* Left image cover */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://i.ibb.co.com/2hzVSbx/Imageby-Stanislav-Kondratievvia-Unsplash.webp"
              className="w-full h-80 object-cover rounded-2xl shadow-md hover:scale-[1.01] transition-transform duration-300"
              alt="The Bookistry Bookstore"
            />
          </div>

          {/* Right descriptions */}
          <div className="w-full lg:w-1/2 space-y-5">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">
              A Bookstore Sanctuary
            </h2>
            <div className="h-1 w-20 bg-teal-500 rounded" />
            
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Nestled in the heart of the city, The Bookistry is more than just a
              bookstore – it’s a sanctuary for book lovers. Our shop is designed
              to inspire curiosity and ignite your imagination, offering a
              curated collection of books from all genres.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Step inside and you’ll be greeted by the warm glow of soft lighting
              and the comforting scent of books. A cozy reading nook with
              plush armchairs invites you to sit down and lose yourself in a
              story.
            </p>
            
            <div className="bg-teal-50/50 rounded-2xl p-5 border border-teal-100/50 mt-6">
              <p className="text-xs text-teal-800 font-semibold uppercase tracking-wider mb-2">Location & Timings</p>
              <p className="text-slate-700 text-sm">
                📍 <strong>2nd Floor Rifat Tower Tejgaon, Dhaka</strong>
              </p>
              <p className="text-slate-700 text-sm mt-1">
                ⏰ <strong>Saturday - Thursday : 9:00 AM - 8:00 PM</strong> (Friday Closed)
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-800 mb-3">How It Works</h2>
            <p className="text-gray-500 text-sm md:text-base">
              Discover how your purchases support our community of local bookstores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="text-center">
                <div className="w-full h-36 bg-slate-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-2">
                  <img
                    src="/62f53a0ab5f1511d391ec6ad_bouncing.gif"
                    alt="Pick a Store"
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-2 flex items-center justify-center gap-2">
                  <FaStore className="text-teal-500 text-sm" /> Pick A Store
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed text-left">
                  Visit our local bookstore page and select the bookstore you'd like to support. If you don't choose a store, you'll contribute to our profit pool that helps all our stores.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="text-center">
                <div className="w-full h-36 bg-slate-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src="/62f53a0ab5f15155621ec6b5_about2-p-500.jpg"
                    alt="Buy a Book"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-2 flex items-center justify-center gap-2">
                  <FaBook className="text-teal-500 text-sm" /> Buy a Book
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed text-left">
                  Your order will be filled directly by our distributor, and the full profit from your purchase will be sent to the bookstore you selected.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="text-center">
                <div className="w-full h-36 bg-slate-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src="/62f53a0ab5f151b01e1ec6af_about1-p-500.jpg"
                    alt="Check the Mail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-2 flex items-center justify-center gap-2">
                  <FaMailBulk className="text-teal-500 text-sm" /> Check the Mail
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed text-left">
                  You'll receive a confirmation and tracking number when your order is placed, and our in-house customer service team will be standing by if you have issues or returns.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="text-center">
                <div className="w-full h-36 bg-slate-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src="/62f53a0ab5f151fbbb1ec6b2_about3-p-500.jpg"
                    alt="Help Bookstores"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-2 flex items-center justify-center gap-2">
                  <FaHandsHelping className="text-teal-500 text-sm" /> Help Bookstores
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed text-left">
                  We donate profits directly to bookstores—both the funds from direct purchases and our profit pool that's split between our 2,000+ stores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
