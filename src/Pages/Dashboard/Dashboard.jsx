import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import {
  FaUser, FaShoppingCart, FaHeart, FaClipboardList,
  FaSignOutAlt, FaEdit, FaTrashAlt, FaBoxOpen,
  FaCheckCircle, FaTruck, FaClock, FaTimes, FaSave
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";

// Helper to format date
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

// Order status badge
const StatusBadge = ({ status }) => {
  const map = {
    Processing: "bg-orange-50 text-orange-700 border-orange-100",
    Shipped: "bg-blue-50 text-blue-700 border-blue-100",
    Delivered: "bg-green-50 text-green-700 border-green-100",
    Cancelled: "bg-red-50 text-red-700 border-red-100",
  };
  const cls = map[status] || "bg-gray-50 text-gray-700 border-gray-100";
  const icons = { Processing: <FaClock />, Shipped: <FaTruck />, Delivered: <FaCheckCircle />, Cancelled: <FaTimes /> };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit ${cls}`}>
      {icons[status]} {status}
    </span>
  );
};

const Dashboard = () => {
  const { user, logOut, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Data states
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit profile modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login");
      return;
    }

    setLoading(true);
    Promise.all([
      axiosPublic.get(`/carts?email=${user.email}`),
      axiosPublic.get(`/orders?email=${user.email}`),
      axiosPublic.get(`/wishlist?email=${user.email}`),
      axiosPublic.get(`/users/${user.email}`),
    ])
      .then(([cartRes, ordersRes, wishlistRes, userRes]) => {
        setCartItems(cartRes.data);
        setOrders(ordersRes.data);
        setWishlist(wishlistRes.data);
        if (userRes.data?.user) setDbUser(userRes.data.user);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({ icon: "success", title: "Logged Out", timer: 1500, showConfirmButton: false });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveWishlist = (id) => {
    Swal.fire({
      title: "Remove from Wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/wishlist/${id}`).then(() => {
          setWishlist((prev) => prev.filter((item) => item._id !== id));
          Swal.fire({ icon: "success", title: "Removed!", timer: 1200, showConfirmButton: false });
        });
      }
    });
  };

  const openEditModal = () => {
    setEditName(user?.displayName || dbUser?.name || "");
    setEditPhoto(user?.photoURL || "");
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      if (updateUserProfile) {
        await updateUserProfile({ displayName: editName, photoURL: editPhoto });
      }
      await axiosPublic.patch(`/users/${user.email}`, { name: editName, photoURL: editPhoto });
      Swal.fire({ icon: "success", title: "Profile Updated!", timer: 1500, showConfirmButton: false });
      setShowEditModal(false);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update Failed", text: err.message });
    } finally {
      setSavingProfile(false);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-gray-100">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "profile", label: "My Profile", icon: <FaUser /> },
    { id: "orders", label: "Order History", icon: <FaClipboardList />, count: orders.length },
    { id: "wishlist", label: "My Wishlist", icon: <FaHeart />, count: wishlist.length },
    { id: "cart", label: "Cart Summary", icon: <FaShoppingCart />, count: cartItems.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">My Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your profile, orders, wishlist & cart.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length, color: "from-teal-500 to-emerald-500", icon: <FaClipboardList /> },
            { label: "Cart Items", value: cartItems.length, color: "from-blue-500 to-indigo-500", icon: <FaShoppingCart /> },
            { label: "Wishlist", value: wishlist.length, color: "from-pink-500 to-rose-500", icon: <FaHeart /> },
            { label: "Cart Value", value: `৳${cartTotal.toFixed(0)}`, color: "from-amber-500 to-orange-500", icon: <FaBoxOpen /> },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">{stat.label}</span>
                <span className="opacity-60 text-lg">{stat.icon}</span>
              </div>
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Sidebar */}
          <aside className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center p-4 border-b border-gray-100">
              <div className="w-24 h-24 rounded-full border-4 border-teal-400/30 shadow-lg overflow-hidden relative mb-4 ring-4 ring-teal-50">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user?.displayName || "User"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-4xl font-black">
                    {(user?.displayName || user?.email || "?").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{user?.displayName || dbUser?.name || "Reader Account"}</h3>
              <p className="text-gray-400 text-xs mt-1">{user?.email}</p>
              <span className="mt-2 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full border border-teal-100">
                {dbUser?.role === "admin" ? "👑 Admin" : "📚 Customer"}
              </span>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-500/20"
                      : "text-slate-600 hover:bg-gray-50 hover:text-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </span>
                  {item.count !== undefined && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === item.id ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
                      {item.count}
                    </span>
                  )}
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

          {/* Main Panel */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm min-h-[480px]">

            {/* ===== PROFILE TAB ===== */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-teal-400 to-emerald-500 rounded-full inline-block" />
                  Account Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  {[
                    { label: "Full Name", value: user?.displayName || dbUser?.name || "N/A" },
                    { label: "Email Address", value: user?.email },
                    { label: "Account Role", value: dbUser?.role === "admin" ? "👑 Administrator" : "📚 Customer" },
                    { label: "Member Since", value: formatDate(dbUser?.createdAt) },
                    { label: "Verified Status", value: "✓ Active & Verified", isGreen: true },
                    { label: "Total Orders", value: `${orders.length} order${orders.length !== 1 ? "s" : ""}` },
                  ].map((row, i) => (
                    <div key={i}>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{row.label}</p>
                      <p className={`font-bold mt-1 text-sm md:text-base ${row.isGreen ? "text-green-600" : "text-slate-800"}`}>{row.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={openEditModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl text-xs hover:opacity-90 transition-all shadow-md"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                  <Link
                    to="/books"
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-gray-50 transition-colors"
                  >
                    <FaShoppingCart /> Browse Books
                  </Link>
                </div>
              </div>
            )}

            {/* ===== ORDERS TAB ===== */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-teal-400 to-emerald-500 rounded-full inline-block" />
                  Order History ({orders.length})
                </h3>

                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaBoxOpen className="text-4xl text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-semibold">No orders yet</p>
                    <p className="text-gray-300 text-sm mt-1">Place your first order from our book collection!</p>
                    <Link to="/books" className="inline-block mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-colors">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        {/* Order Header */}
                        <div className="bg-gray-50/80 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100">
                          <div>
                            <p className="text-xs text-gray-400 font-medium">Order ID</p>
                            <p className="font-black text-slate-800 text-sm font-mono">#{order._id?.toString().slice(-8).toUpperCase()}</p>
                          </div>
                          <div className="text-right sm:text-left">
                            <p className="text-xs text-gray-400">Date</p>
                            <p className="text-slate-600 text-sm font-semibold">{formatDate(order.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Total</p>
                            <p className="font-extrabold text-teal-600">৳{parseFloat(order.total || 0).toFixed(0)}</p>
                          </div>
                          <StatusBadge status={order.status} />
                        </div>
                        {/* Order Items */}
                        <div className="px-5 py-4 space-y-2">
                          {(order.items || []).map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              {item.img && (
                                <img src={item.img} alt={item.title} className="w-10 h-12 object-cover rounded-lg shrink-0 border" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-800 text-sm truncate">{item.title}</p>
                                <p className="text-xs text-gray-400">by {item.author} · Qty: {item.quantity}</p>
                              </div>
                              <p className="text-teal-600 font-bold text-sm shrink-0">
                                ৳{(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(0)}
                              </p>
                            </div>
                          ))}
                        </div>
                        {/* TxnID */}
                        <div className="px-5 pb-3">
                          <p className="text-xs text-gray-400 font-mono">
                            TxnID: <span className="text-gray-500">{order.transactionId}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ===== WISHLIST TAB ===== */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-pink-400 to-rose-500 rounded-full inline-block" />
                  My Wishlist ({wishlist.length})
                </h3>

                {wishlist.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="text-4xl text-rose-200" />
                    </div>
                    <p className="text-gray-400 font-semibold">Your wishlist is empty</p>
                    <p className="text-gray-300 text-sm mt-1">Click the heart ❤️ on any book to save it here.</p>
                    <Link to="/books" className="inline-block mt-4 bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-colors">
                      Explore Books
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item._id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative">
                        <div className="w-16 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-extrabold text-slate-800 text-sm truncate">{item.title}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">by {item.author}</p>
                            <p className="text-xs text-gray-300 mt-0.5">Added: {formatDate(item.addedAt)}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-teal-600 font-extrabold text-sm">৳{item.price}</span>
                            <Link to={`/book/${item.bookId}`} className="text-xs font-bold text-teal-500 hover:text-teal-700 underline">
                              View Book
                            </Link>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveWishlist(item._id)}
                          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Remove from wishlist"
                        >
                          <FaTrashAlt className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ===== CART TAB ===== */}
            {activeTab === "cart" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full inline-block" />
                  Cart Summary ({cartItems.length} items)
                </h3>

                {cartItems.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaShoppingCart className="text-4xl text-blue-200" />
                    </div>
                    <p className="text-gray-400 font-semibold">Your cart is empty</p>
                    <Link to="/books" className="inline-block mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-colors">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-gray-50/60 border border-gray-100 rounded-2xl items-center justify-between hover:shadow-sm transition-shadow">
                        <div className="flex gap-3 items-center min-w-0">
                          <div className="w-12 h-16 bg-white rounded-xl overflow-hidden shrink-0 flex items-center justify-center border">
                            <img src={item.img} alt={item.title} className="max-h-full max-w-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-slate-800 text-sm truncate">{item.title}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">by {item.author}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                        <span className="text-teal-600 font-extrabold text-base shrink-0">
                          ৳{(parseFloat(item.price) * (item.quantity || 1)).toFixed(0)}
                        </span>
                      </div>
                    ))}

                    {/* Summary Footer */}
                    <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-teal-600 font-bold uppercase tracking-wider">Cart Total</p>
                        <p className="text-2xl font-black text-teal-700">৳{cartTotal.toFixed(0)}</p>
                      </div>
                      <Link to="/cart" className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                        Proceed to Checkout →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ===== Edit Profile Modal ===== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Photo URL</label>
                <input
                  type="text"
                  value={editPhoto}
                  onChange={(e) => setEditPhoto(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                />
              </div>
              {editPhoto && (
                <div className="flex justify-center">
                  <img src={editPhoto} alt="Preview" className="w-20 h-20 rounded-full object-cover border-4 border-teal-200" onError={(e) => e.target.style.display='none'} />
                </div>
              )}
              <button
                onClick={handleSaveProfile}
                disabled={savingProfile}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {savingProfile ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                ) : (
                  <><FaSave /> Save Changes</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
