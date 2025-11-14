import { Link } from "react-router";
import { FaBook } from "react-icons/fa";
import { motion } from "framer-motion"; 

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 px-4">
      {/* Animated Book Icon */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        className="text-9xl text-purple-600 mb-6"
      >
        <FaBook />
      </motion.div>

      {/* Animated 404 Text */}
      <motion.h1
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-7xl md:text-9xl font-extrabold text-purple-700 mb-4"
      >
        404
      </motion.h1>

      <p className="text-xl md:text-2xl text-gray-700 mb-6 text-center max-w-md">
        Oops! Looks like the page you’re looking for got lost in our library 📚.
      </p>

      {/* Button with hover effect */}
      <Link
        to="/"
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
