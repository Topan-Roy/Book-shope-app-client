import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { FaUser, FaShoppingCart, FaHeart, FaClipboardList, FaEdit, FaSignOutAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login");
      return;
    }

    setLoading(true);
    axiosPublic
      .get(`/carts?email=${user.email}`)
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Mock data for Dashboard stats and list
  const mockOrders = [
    { id: "ORD-9872", date: "June 18, 2026", total: "৳1,200", status: "Delivered" },
    { id: "ORD-5431", date: "June 05, 2026", total: "৳450", status: "Processing" },
  ];

  const mockWishlist = [
    { id: "1", title: "Atomic Habits", author: "James Clear", price: "500", img: "https://i.ibb.co.com/2hzVSbx/Imageby-Stanislav-Kondratievvia-Unsplash.webp" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 text-left pt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">My Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account, order history, and shopping cart.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Menu Panel (4 cols) */}
          <aside className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
            <div className="flex flex-col items-center text-center p-4 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full border-4 border-teal-500/20 shadow-md overflow-hidden relative mb-4">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user?.displayName || "User"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{user?.displayName || "Reader Account"}</h3>
              <p className="text-gray-400 text-xs mt-1">{user?.email}</p>
            </div>

            {/* Menu Buttons */}
            <nav className="flex flex-col gap-2">
              {[
                { id: "profile", label: "My Profile", icon: <FaUser /> },
                { id: "orders", label: "Order History", icon: <FaClipboardList /> },
                { id: "wishlist", label: "My Wishlist", icon: <FaHeart /> },
                { id: "cart", label: "Cart Summary", icon: <FaShoppingCart /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === item.id
                      ? "bg-teal-500 text-white shadow-md shadow-teal-500/10"
                      : "text-slate-600 hover:bg-gray-50 hover:text-slate-800"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}

              <hr className="border-gray-100 my-2" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
              >
                <FaSignOutAlt className="text-base" />
                Logout Account
              </button>
            </nav>
          </aside>

          {/* Right Main Content Panel (8 cols) */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm min-h-[420px]">
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-5 bg-teal-500 rounded-full inline-block" />
                  Account Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                    <p className="text-slate-800 font-bold mt-1 text-sm md:text-base">{user?.displayName || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-slate-800 font-bold mt-1 text-sm md:text-base">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Role</p>
                    <p className="text-teal-655 text-xs font-bold uppercase mt-1 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full inline-block">
                      Customer Account
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified status</p>
                    <p className="text-green-700 text-xs font-bold uppercase mt-1 px-3 py-1 bg-green-50 border border-green-100 rounded-full inline-block">
                      ✓ Active
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors">
                    <FaEdit /> Edit Profile
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-gray-50 transition-colors">
                    <FaLock /> Change Password
                  </button>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-5 bg-teal-500 rounded-full inline-block" />
                  Order History
                </h3>

                <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/70 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 tracking-wider">Order ID</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 tracking-wider">Total</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {mockOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-800">{ord.id}</td>
                          <td className="px-6 py-4 text-slate-500">{ord.date}</td>
                          <td className="px-6 py-4 font-bold text-teal-600">{ord.total}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              ord.status === "Delivered" ? "bg-green-50 text-green-700 border border-green-100" : "bg-orange-50 text-orange-700 border border-orange-100"
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-5 bg-teal-500 rounded-full inline-block" />
                  My Wishlist ({mockWishlist.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockWishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="w-16 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img src={item.img} alt={item.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-sm truncate leading-snug">{item.title}</h4>
                          <p className="text-xs text-slate-400 mt-1">by {item.author}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-teal-600 font-extrabold text-sm">৳{item.price}</span>
                          <Link to={`/book/${item.id}`} className="text-xs font-bold text-teal-500 hover:text-teal-600 underline">
                            View Book
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CART TAB */}
            {activeTab === "cart" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-5 bg-teal-500 rounded-full inline-block" />
                  Current Cart Items ({cartItems.length})
                </h3>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 font-medium">Your shopping cart is empty.</p>
                    <Link to="/books" className="inline-block mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-2 rounded-xl text-xs transition-colors">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-gray-50/50 border border-gray-100 rounded-2xl items-center justify-between">
                        <div className="flex gap-4 items-center min-w-0">
                          <div className="w-12 h-16 bg-white rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1 border">
                            <img src={item.img} alt={item.title} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-slate-800 text-sm truncate">{item.title}</h4>
                            <p className="text-xs text-slate-400 mt-1">by {item.author}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-teal-600 font-extrabold text-base">৳{item.price}</span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                      <Link to="/cart" className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-3 rounded-xl text-xs shadow-md transition-colors">
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
