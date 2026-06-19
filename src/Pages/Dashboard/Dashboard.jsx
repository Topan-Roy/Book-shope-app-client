import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import {
  FaUser, FaShoppingCart, FaHeart, FaClipboardList,
  FaSignOutAlt, FaEdit, FaTrashAlt, FaBoxOpen,
  FaCheckCircle, FaTruck, FaClock, FaTimes, FaSave,
  FaUsers, FaClipboardCheck, FaBookOpen, FaPlus
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
  const { user, loading: authLoading, logOut, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // User Data states
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [dbUser, setDbUser] = useState(null);
  
  // Admin Data states
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  // Edit profile modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (authLoading) return; // Wait for Firebase Auth to initialize

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
      .then(async ([cartRes, ordersRes, wishlistRes, userRes]) => {
        console.log("Fetched User Data:", userRes.data);
        setCartItems(cartRes.data);
        setOrders(ordersRes.data);
        setWishlist(wishlistRes.data);
        const fetchedUser = userRes.data?.user;
        if (fetchedUser) {
          console.log("Setting DB User:", fetchedUser);
          setDbUser(fetchedUser);
          // If admin, fetch admin data
          if (fetchedUser.role === "admin") {
            console.log("User is admin, fetching admin data...");
            try {
              const [uRes, oRes, bRes] = await Promise.all([
                axiosPublic.get('/users'),
                axiosPublic.get('/all-orders'),
                axiosPublic.get('/books')
              ]);
              setAllUsers(uRes.data);
              setAllOrders(oRes.data);
              setAllBooks(bRes.data);
            } catch(e) {
              console.error("Failed fetching admin data", e);
            }
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user, navigate, axiosPublic]);

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

  // ----- ADMIN FUNCTIONS -----
  const handleChangeRole = (userId, userName, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const actionText = newRole === "admin" ? "make Admin" : "remove Admin role from";
    
    Swal.fire({
      title: `Change Role?`,
      text: `Are you sure you want to ${actionText} ${userName || "this user"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/users/role/${userId}`, { role: newRole }).then(() => {
          setAllUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
          Swal.fire({ icon: "success", title: "Role Updated", text: `${userName || "User"} is now a ${newRole}.`, timer: 1500 });
        });
      }
    });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    axiosPublic.patch(`/orders/status/${orderId}`, { status: newStatus }).then(() => {
      setAllOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      Swal.fire({ icon: "success", title: "Status Updated", timer: 1200, showConfirmButton: false });
    });
  };

  const handleDeleteBook = (bookId, title) => {
    Swal.fire({
      title: "Delete Book?",
      text: `Are you sure you want to delete "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/books/${bookId}`).then(() => {
          setAllBooks(prev => prev.filter(b => b._id !== bookId));
          Swal.fire({ icon: "success", title: "Deleted!", timer: 1200, showConfirmButton: false });
        });
      }
    });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1), 0);

  if (authLoading || loading) {
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
    { id: "orders", label: "My Orders", icon: <FaClipboardList />, count: orders.length },
    { id: "wishlist", label: "My Wishlist", icon: <FaHeart />, count: wishlist.length },
    { id: "cart", label: "Cart Summary", icon: <FaShoppingCart />, count: cartItems.length },
  ];

  const adminNavItems = [
    { id: "admin-users", label: "Manage Users", icon: <FaUsers />, count: allUsers.length },
    { id: "admin-orders", label: "Manage All Orders", icon: <FaClipboardCheck />, count: allOrders.length },
    { id: "admin-books", label: "Manage Books", icon: <FaBookOpen />, count: allBooks.length },
  ];

  const isAdmin = dbUser?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">
            {isAdmin ? "Admin Dashboard" : "My Dashboard"}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {isAdmin ? "Manage your platform's users, orders, and books." : "Manage your profile, orders, wishlist & cart."}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {isAdmin ? (
            // Admin Stats
            [
              { label: "Total Users", value: allUsers.length, color: "from-indigo-500 to-purple-500", icon: <FaUsers /> },
              { label: "Total Revenue", value: `৳${allOrders.reduce((sum, o) => sum + parseFloat(o.total||0), 0).toFixed(0)}`, color: "from-amber-500 to-orange-500", icon: <FaCheckCircle /> },
              { label: "Total Orders", value: allOrders.length, color: "from-blue-500 to-cyan-500", icon: <FaClipboardCheck /> },
              { label: "Total Books", value: allBooks.length, color: "from-teal-500 to-emerald-500", icon: <FaBookOpen /> },
            ].map((stat, i) => (
              <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">{stat.label}</span>
                  <span className="opacity-60 text-lg">{stat.icon}</span>
                </div>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            ))
          ) : (
            // User Stats
            [
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
            ))
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Sidebar */}
          <aside className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center p-4 border-b border-gray-100">
              <div className={`w-24 h-24 rounded-full border-4 shadow-lg overflow-hidden relative mb-4 ring-4 ${isAdmin ? 'border-indigo-400/30 ring-indigo-50' : 'border-teal-400/30 ring-teal-50'}`}>
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user?.displayName || "User"} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${isAdmin ? 'from-indigo-500 to-purple-500' : 'from-teal-500 to-emerald-500'} flex items-center justify-center text-white text-4xl font-black`}>
                    {(user?.displayName || user?.email || "?").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{user?.displayName || dbUser?.name || "Reader Account"}</h3>
              <p className="text-gray-400 text-xs mt-1">{user?.email}</p>
              <span className={`mt-2 px-3 py-1 text-xs font-bold rounded-full border ${isAdmin ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-teal-50 text-teal-700 border-teal-100'}`}>
                {isAdmin ? "👑 Administrator" : "📚 Customer"}
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

              {isAdmin && (
                <>
                  <hr className="border-gray-100 my-4" />
                  <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest pl-4 mb-2">Admin Panel</p>
                  {adminNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/20"
                          : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-800"
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
                </>
              )}

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
          <main className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm min-h-[480px] overflow-hidden">

            {/* ===== PROFILE TAB ===== */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className={`w-2 h-6 rounded-full inline-block bg-gradient-to-b ${isAdmin ? 'from-indigo-400 to-purple-500' : 'from-teal-400 to-emerald-500'}`} />
                  Account Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  {[
                    { label: "Full Name", value: user?.displayName || dbUser?.name || "N/A" },
                    { label: "Email Address", value: user?.email },
                    { label: "Account Role", value: isAdmin ? "👑 Administrator" : "📚 Customer" },
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
                    className={`flex items-center gap-2 px-5 py-2.5 text-white font-bold rounded-xl text-xs hover:opacity-90 transition-all shadow-md bg-gradient-to-r ${isAdmin ? 'from-indigo-500 to-purple-500' : 'from-teal-500 to-emerald-500'}`}
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
                  My Order History ({orders.length})
                </h3>

                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaBoxOpen className="text-4xl text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-semibold">No orders yet</p>
                    <Link to="/books" className="inline-block mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-colors">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-gray-50/80 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100">
                          <div>
                            <p className="text-xs text-gray-400 font-medium">Order ID</p>
                            <p className="font-black text-slate-800 text-sm font-mono">#{order._id?.toString().slice(-8).toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Date</p>
                            <p className="text-slate-600 text-sm font-semibold">{formatDate(order.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Total</p>
                            <p className="font-extrabold text-teal-600">৳{parseFloat(order.total || 0).toFixed(0)}</p>
                          </div>
                          <StatusBadge status={order.status} />
                        </div>
                        <div className="px-5 py-4 space-y-2">
                          {(order.items || []).map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              {item.img && <img src={item.img} alt={item.title} className="w-10 h-12 object-cover rounded-lg shrink-0 border" />}
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-800 text-sm truncate">{item.title}</p>
                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ===== WISHLIST & CART TABS REMAIN SIMILAR ===== */}
            {activeTab === "wishlist" && (
               <div className="space-y-6">
               <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                 <span className="w-2 h-6 bg-gradient-to-b from-pink-400 to-rose-500 rounded-full inline-block" />
                 My Wishlist ({wishlist.length})
               </h3>
               {wishlist.length === 0 ? (
                 <p className="text-gray-400">Your wishlist is empty.</p>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {wishlist.map((item) => (
                     <div key={item._id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl relative">
                       <img src={item.img} alt={item.title} className="w-12 h-16 object-cover rounded-lg" />
                       <div>
                         <h4 className="font-bold text-sm">{item.title}</h4>
                         <span className="text-teal-600 font-extrabold text-sm">৳{item.price}</span>
                       </div>
                       <button onClick={() => handleRemoveWishlist(item._id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><FaTrashAlt /></button>
                     </div>
                   ))}
                 </div>
               )}
             </div>
            )}

            {activeTab === "cart" && (
               <div className="space-y-6">
                 <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                   <span className="w-2 h-6 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full inline-block" />
                   Cart Summary ({cartItems.length} items)
                 </h3>
                 {cartItems.map((item, idx) => (
                   <div key={idx} className="flex gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl items-center justify-between">
                     <div className="flex gap-3 items-center">
                       <img src={item.img} alt={item.title} className="w-10 h-14 object-cover rounded-md" />
                       <div>
                         <h4 className="font-bold text-sm">{item.title}</h4>
                         <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                       </div>
                     </div>
                     <span className="text-teal-600 font-extrabold">৳{(item.price * (item.quantity||1)).toFixed(0)}</span>
                   </div>
                 ))}
                 {cartItems.length > 0 && (
                   <div className="mt-4 text-right">
                     <Link to="/cart" className="bg-teal-500 text-white px-6 py-2 rounded-xl font-bold">Checkout (৳{cartTotal})</Link>
                   </div>
                 )}
               </div>
            )}

            {/* ============================== */}
            {/* ====== ADMIN TABS ====== */}
            {/* ============================== */}

            {/* ADMIN USERS TAB */}
            {activeTab === "admin-users" && isAdmin && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full inline-block" />
                  Manage Users ({allUsers.length})
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                      <tr>
                        <th className="px-6 py-3 font-bold">User</th>
                        <th className="px-6 py-3 font-bold">Email</th>
                        <th className="px-6 py-3 font-bold">Role</th>
                        <th className="px-6 py-3 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {allUsers.map((u) => (
                        <tr key={u._id} className="hover:bg-gray-50/50">
                          <td className="px-6 py-4 font-bold text-slate-800">{u.name || "N/A"}</td>
                          <td className="px-6 py-4 text-gray-500">{u.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                              {u.role === 'admin' ? "Admin" : "User"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleChangeRole(u._id, u.name, u.role)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                u.role === 'admin' 
                                  ? "bg-red-50 text-red-600 hover:bg-red-500 hover:text-white" 
                                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white"
                              }`}
                            >
                              {u.role === 'admin' ? "Remove Admin" : "Make Admin"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ADMIN ORDERS TAB */}
            {activeTab === "admin-orders" && isAdmin && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full inline-block" />
                  Manage All Orders ({allOrders.length})
                </h3>
                <div className="space-y-4">
                  {allOrders.map((order) => (
                    <div key={order._id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Order #{order._id.toString().slice(-6)}</p>
                          <p className="font-bold text-sm">{order.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <StatusBadge status={order.status} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN BOOKS TAB */}
            {activeTab === "admin-books" && isAdmin && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full inline-block" />
                    Manage Books ({allBooks.length})
                  </h3>
                  <Link
                    to="/addbook"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-md"
                  >
                    <FaPlus /> Add New Book
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allBooks.map(book => (
                    <div key={book._id} className="border border-gray-100 rounded-2xl p-4 flex gap-4 relative group">
                      <img src={book.img} alt={book.title} className="w-16 h-24 object-cover rounded-lg border shadow-sm" />
                      <div className="flex-1 min-w-0 pr-6">
                        <p className="font-bold text-sm truncate">{book.title}</p>
                        <p className="text-xs text-gray-500 truncate">{book.author}</p>
                        <p className="text-indigo-600 font-extrabold mt-2">৳{book.price}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBook(book._id, book.title)}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Delete Book"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
