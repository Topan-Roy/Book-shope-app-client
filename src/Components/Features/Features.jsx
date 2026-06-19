import React from "react";
import { FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset } from "react-icons/fa";

const Features = () => {
  const featuresList = [
    {
      id: 1,
      icon: <FaTruck className="text-3xl text-teal-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Free Delivery",
      desc: "On all orders over ৳1000",
      bgColor: "bg-teal-50/50 border-teal-100/30",
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-3xl text-orange-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Secure Payment",
      desc: "100% secure checkout via Stripe",
      bgColor: "bg-orange-50/50 border-orange-100/30",
    },
    {
      id: 3,
      icon: <FaUndoAlt className="text-3xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Easy Returns",
      desc: "10-day hassle-free return policy",
      bgColor: "bg-blue-50/50 border-blue-100/30",
    },
    {
      id: 4,
      icon: <FaHeadset className="text-3xl text-purple-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "24/7 Support",
      desc: "Dedicated customer care service",
      bgColor: "bg-purple-50/50 border-purple-100/30",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuresList.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-5 p-6 bg-white border ${item.bgColor} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group`}
          >
            <div className="p-3.5 bg-white rounded-xl shadow-inner border border-gray-50 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="font-extrabold text-slate-800 text-base mb-1">
                {item.title}
              </h4>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
