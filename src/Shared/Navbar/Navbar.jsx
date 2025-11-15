
import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { useState, useEffect } from "react";
import SubNavbar from "./SubNavbar";

const Navbar = () => {
    const [scrollDirection, setScrollDirection] = useState("up");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = () => {
        setScrollDirection(window.scrollY > 100 ? "down" : "up");
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/books", label: "Books" },
        { path: "/author", label: "Author" },
        { path: "/about", label: "About" },
        { path: "/bloge", label: "Blog" },
        { path: "/contact", label: "Contact" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 shadow-lg">
            {/* SubNavbar */}
            <div className={`${scrollDirection === "down" ? "hidden" : "block"} transition-all duration-500`}>
                <SubNavbar />
            </div>

            {/* Main Navbar */}
            <div className="bg-gray-200 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        {/* <img
                            src="https://i.ibb.co/VmX711W/images-removebg-preview.png"
                            alt="Logo"
                            className="h-12 w-auto object-contain"
                        /> */}
                        <span className=" font-bold text-2xl text-teal-700">Bookistry</span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search books, authors..."
                                className="px-4 py-2 w-80 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <button className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-teal-600">
                                <CiSearch className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-3">
                        <Link to="/cart" className="hidden lg:flex relative">
                            <FaCartShopping className="h-6 w-6 text-gray-600 hover:text-teal-600" />
                            <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
                        </Link>
                        <Link to="/login" className="hidden lg:flex px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Sign In</Link>

                        {/* Mobile Menu */}
                        <div className="md:hidden relative">
                            <button onClick={() => setMenuOpen(!menuOpen)}>
                                <IoMenuSharp className="h-6 w-6 text-gray-700" />
                            </button>
                            {menuOpen && (
                                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-sm font-medium space-y-1">
                                    {navItems.map((item) => (
                                        <li key={item.path}>
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    isActive ? "block px-4 py-2 text-teal-600" : "block px-4 py-2 text-gray-700 hover:text-teal-600"
                                                }
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {item.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                    <li>
                                        <Link to="/cart" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-teal-600">
                                            <FaCartShopping className="h-5 w-5" /> Cart (0)
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex justify-center py-3">
                    <ul className="flex gap-6 text-sm font-semibold">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive ? "text-teal-600 uppercase font-semibold" : "text-gray-700 hover:text-teal-500 uppercase font-semibold"
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
