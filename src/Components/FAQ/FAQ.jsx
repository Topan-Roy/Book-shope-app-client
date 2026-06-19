import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus, FaUsers, FaBook, FaPenFancy, FaAward } from "react-icons/fa";

// Lightweight custom CountUp component using IntersectionObserver
const CountUp = ({ end, duration = 2000, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const endValue = parseFloat(end);
    if (isNaN(endValue)) return;
    if (start === endValue) return;

    const incrementTime = 30; // ms
    const totalSteps = duration / incrementTime;
    const increment = (endValue - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        clearInterval(timer);
        setCount(endValue);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  // Format with commas: e.g. 12,000
  const formattedCount = count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return <span ref={elementRef}>{formattedCount}{suffix}</span>;
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I purchase a book using card payment?",
      answer: "You can securely purchase any book using your debit/credit card. We use Stripe Payment Gateway which supports all major card types including Visa, MasterCard, and American Express.",
    },
    {
      question: "What is your delivery timeframe across Bangladesh?",
      answer: "For deliveries inside Dhaka, it takes 1 to 2 business days. For areas outside Dhaka, it usually takes 3 to 5 business days to reach your doorstep.",
    },
    {
      question: "What is your return and refund policy?",
      answer: "We offer a 10-day hassle-free return policy. If you receive a damaged, misprinted, or wrong book, you can request a return or replacement via our Contact page or support mail.",
    },
    {
      question: "Can I order books in bulk for libraries or schools?",
      answer: "Yes! We offer bulk ordering discounts. Please send an inquiry through our Online Inquiry Form on the Contact page selecting 'Bulk Ordering' as your interest.",
    },
  ];

  const stats = [
    { id: 1, icon: <FaUsers />, end: 12000, suffix: "+", label: "Happy Readers" },
    { id: 2, icon: <FaBook />, end: 5500, suffix: "+", label: "Book Collections" },
    { id: 3, icon: <FaPenFancy />, end: 150, suffix: "+", label: "Famous Authors" },
    { id: 4, icon: <FaAward />, end: 99.8, suffix: "%", decimals: 1, label: "Satisfaction Rate" },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-left">
      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-6 shadow-md flex flex-col items-center justify-center text-center border border-teal-500/10 group hover:shadow-xl transition-all duration-300"
          >
            <span className="text-3xl text-teal-400 mb-3 group-hover:scale-110 transition-transform">
              {stat.icon}
            </span>
            <h3 className="text-2xl md:text-3xl font-black">
              <CountUp
                end={stat.end}
                suffix={stat.suffix}
                decimals={stat.decimals || 0}
              />
            </h3>
            <p className="text-teal-300/70 text-xs font-semibold uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Accordion Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Info Panel */}
        <div className="lg:col-span-5 space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-100">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Find answers to common questions about payment methods, shipping times, return policies, and bulk discounts. If you need further help, feel free to contact us.
          </p>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 text-sm md:text-base hover:text-teal-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-slate-400 bg-gray-50 w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100/50">
                    {isOpen ? <FaMinus size={10} /> : <FaPlus size={10} />}
                  </span>
                </button>

                {/* Collapsible Content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-gray-50" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-slate-500 text-xs md:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
