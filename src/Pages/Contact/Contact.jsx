import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Select An Interest",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in Name, Email, and Message before sending.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Inquiry Sent!",
      text: `Thank you, ${formData.name}. We have received your inquiry regarding "${formData.interest}" and will contact you shortly.`,
      confirmButtonColor: "#0d9488",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "Select An Interest",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 text-left">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-[#0f172a] text-white py-20 px-4">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-widest border border-teal-500/20 mb-6">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Contact <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            Have questions about our store, book ordering, or anything else? Send us a message and our team will get right back to you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Online Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-teal-500 rounded-full inline-block" />
              Online Inquiry
            </h3>

            <form onSubmit={handleSend} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name..."
                  className="w-full bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all text-sm rounded-xl px-4 py-3"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address..."
                    className="w-full bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all text-sm rounded-xl px-4 py-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number..."
                    className="w-full bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all text-sm rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Interested In</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all text-sm rounded-xl px-4 py-3"
                >
                  <option>Select An Interest</option>
                  <option>Book Availability</option>
                  <option>Bulk Ordering</option>
                  <option>Author Collaboration</option>
                  <option>General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="4"
                  className="w-full bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all text-sm rounded-xl px-4 py-3 h-32"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
              >
                <FaPaperPlane size={12} /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Box */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full inline-block" />
                Contact Details
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:roytopan734@gmail.com"
                  className="flex items-center gap-3.5 p-4 bg-teal-50/40 hover:bg-teal-50 border border-teal-100/30 rounded-2xl transition-all text-sm text-teal-700 font-bold group"
                >
                  <span className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-teal-600 group-hover:scale-105 transition-transform">
                    <FaEnvelope />
                  </span>
                  roytopan734@gmail.com
                </a>

                <a
                  href="tel:+8801706541105"
                  className="flex items-center gap-3.5 p-4 bg-teal-50/40 hover:bg-teal-50 border border-teal-100/30 rounded-2xl transition-all text-sm text-teal-700 font-bold group"
                >
                  <span className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-teal-600 group-hover:scale-105 transition-transform">
                    <FaPhoneAlt />
                  </span>
                  (+880) 1706541105
                </a>
              </div>
            </div>

            {/* Offices details grid */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full inline-block" />
                Our Offices
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-teal-600 border border-gray-100/50 mt-0.5 shrink-0">
                    <FaMapMarkerAlt size={12} />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Westfield Dhaka</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Tejgaon, Dhaka - 1208, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-teal-600 border border-gray-100/50 mt-0.5 shrink-0">
                    <FaMapMarkerAlt size={12} />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Birgonj Dinajpur Office</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      PTI Mor, Birgonj, Dinajpur, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-teal-600 border border-gray-100/50 mt-0.5 shrink-0">
                    <FaMapMarkerAlt size={12} />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Ram Nagar Office</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      549 Millburn Ave, Ram Nagar, Dinajpur, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
