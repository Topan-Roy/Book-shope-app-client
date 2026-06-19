import { CiSearch } from "react-icons/ci";
import { FaCartShopping} from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { useState, useEffect, useContext } from "react";
import SubNavbar from "./SubNavbar";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";

import useAxios from "../../Hook/useAxios";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const axiosInstance = useAxios();

    const handleScroll = () => {
        setScrollDirection(window.scrollY > 100 ? "down" : "up");
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchCart = () => {
            if (user && user.email) {
                axiosInstance.get(`/carts?email=${user.email}`)
                    .then(res => setCartItems(res.data))
                    .catch(console.error);
            } else {
                setCartItems([]);
            }
        };

        fetchCart();

        window.addEventListener('cartUpdated', fetchCart);
        return () => window.removeEventListener('cartUpdated', fetchCart);
    }, [user, axiosInstance]);

    const handleLogout = async () => {
        try {
            await logOut();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Logged out successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Logout failed",
                text: err.message,
            });
        }
    };

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
                        <div className="relative">
                            <button onClick={() => setCartOpen(!cartOpen)} className="hidden lg:flex relative focus:outline-none">
                                <FaCartShopping className="h-6 w-6 text-gray-600 hover:text-teal-600" />
                                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItems.length}</span>
                            </button>

                            {cartOpen && (
                                <div className="absolute right-0 mt-4 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 py-3 text-sm font-medium z-50 overflow-hidden transform transition-all duration-300 origin-top-right">
                                    <div className="px-5 pb-3 border-b border-gray-100 flex justify-between items-center">
                                        <h3 className="text-gray-800 font-bold text-lg">Your Cart</h3>
                                        <span className="bg-teal-100 text-teal-700 py-1 px-3 rounded-full text-xs font-bold">{cartItems.length} Items</span>
                                    </div>
                                    
                                    {cartItems.length === 0 ? (
                                        <div className="px-4 py-8 flex flex-col items-center justify-center">
                                            <FaCartShopping className="h-10 w-10 text-gray-300 mb-2" />
                                            <p className="text-gray-500 text-center">Your cart is empty.</p>
                                        </div>
                                    ) : (
                                        <div className="max-h-64 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
                                            {cartItems.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4 px-3 py-2 hover:bg-teal-50 rounded-xl transition-colors duration-200 group cursor-pointer">
                                                    <div className="h-12 w-10 shrink-0 overflow-hidden rounded-md shadow-sm">
                                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-gray-800 font-semibold truncate text-base">{item.title}</p>
                                                        <p className="text-teal-600 font-bold">${item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="px-4 pt-3 pb-1 border-t border-gray-100 mt-1">
                                        <Link to="/cart" onClick={() => setCartOpen(false)} className="block w-full text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-bold tracking-wide">
                                            Go to Checkout
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Auth Buttons */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="lg:flex items-center gap-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200 border border-gray-300 transition-colors"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="profile" className="w-8 h-8 rounded-full object-cover shadow-sm border border-teal-500" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                            {user.email?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </button>

                                {profileOpen && (
                                    <ul className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 text-sm font-medium space-y-1 z-50">
                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => { handleLogout(); setProfileOpen(false); }}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="hidden lg:flex px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Menu */}
                        <div className="md:hidden relative">
                            <button onClick={() => setMenuOpen(!menuOpen)}>
                                <IoMenuSharp className="h-6 w-6 text-gray-700" />
                            </button>
                            {menuOpen && (
                                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-sm font-medium space-y-1 z-50">
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
                                            <FaCartShopping className="h-5 w-5" /> Cart ({cartItems.length})
                                        </Link>
                                    </li>
                                    <li>
                                        {!user ? (
                                            <Link
                                                to="/login"
                                                className="block px-4 py-2 text-gray-700 hover:text-teal-600"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => { handleLogout(); setMenuOpen(false); }}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-red-500"
                                            >
                                                Logout
                                            </button>
                                        )}
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
