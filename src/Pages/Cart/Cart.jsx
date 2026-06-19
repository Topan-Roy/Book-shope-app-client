import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import useAxios from "../../Hook/useAxios";
import { FaTrashAlt, FaMinus, FaPlus, FaShoppingBag, FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Cart = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const fetchCart = () => {
    if (user && user.email) {
      axiosInstance
        .get(`/carts?email=${user.email}`)
        .then((res) => {
          const items = res.data.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          setCartItems(items);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleQuantityChange = (item, delta) => {
    const newQty = (item.quantity || 1) + delta;
    if (newQty < 1) return;
    axiosInstance
      .patch(`/carts/${item._id}`, { quantity: newQty })
      .then(() => {
        setCartItems((prev) =>
          prev.map((c) => (c._id === item._id ? { ...c, quantity: newQty } : c))
        );
        window.dispatchEvent(new Event("cartUpdated"));
      })
      .catch(console.error);
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Remove item?",
      text: `"${item.title}" will be removed from your cart.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/carts/${item._id}`)
          .then(() => {
            setCartItems((prev) => prev.filter((c) => c._id !== item._id));
            window.dispatchEvent(new Event("cartUpdated"));
            Swal.fire({
              icon: "success",
              title: "Removed!",
              text: "Item removed from cart.",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch(console.error);
      }
    });
  };

  const handlePaymentSuccess = async (transactionId) => {
    setPaymentSuccess(true);

    // Build the order object to save in DB
    const orderData = {
      email: user.email,
      transactionId,
      items: cartItems.map((item) => ({
        bookId: item.bookId || item._id,
        title: item.title,
        author: item.author,
        price: item.price,
        img: item.img,
        quantity: item.quantity || 1,
      })),
      total: total,
      status: "Processing",
    };

    try {
      await axiosInstance.post("/orders", orderData);
    } catch (err) {
      console.error("Failed to save order:", err);
    }

    // Clear cart after successful payment
    const deletePromises = cartItems.map((item) =>
      axiosInstance.delete(`/carts/${item._id}`)
    );
    Promise.all(deletePromises).then(() => {
      window.dispatchEvent(new Event("cartUpdated"));
      setCartItems([]);
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-gray-100">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-100 pt-15 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="">
          <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Your Cart</h1>
          <p className="text-gray-500 mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 && !paymentSuccess ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-teal-50 rounded-full p-8 mb-6 shadow-inner">
              <FaShoppingBag className="text-6xl text-teal-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Browse books and add something you love!</p>
            <Link
              to="/books"
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all hover:shadow-xl hover:-translate-y-0.5 duration-200"
            >
              Browse Books
            </Link>
          </div>
        ) : paymentSuccess && cartItems.length === 0 ? (
          /* Payment Success Full Page */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Order Confirmed! 🎉</h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Your payment was successful. Your books will be delivered soon!
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center gap-5 p-4 group"
                >
                  <div className="h-28 w-20 shrink-0 overflow-hidden rounded-xl shadow-sm">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 truncate">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">by {item.author}</p>
                    <p className="text-teal-600 font-extrabold text-lg mt-1">
                      ৳{(parseFloat(item.price) * (item.quantity || 1)).toFixed(0)}
                    </p>
                    <p className="text-gray-400 text-xs">৳{item.price} each</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-100 hover:text-teal-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-6 text-center font-bold text-gray-800 text-base">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      title="Remove item"
                    >
                      <FaTrashAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-36">
                <h2 className="text-xl font-bold text-gray-800 mb-5 border-b border-gray-100 pb-3">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold text-gray-800">৳{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-800">৳{shipping}</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-teal-600 text-xl">৳{total.toFixed(0)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowPayment(true)}
                  className="mt-6 w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3.5 rounded-xl font-bold text-base shadow-md hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Proceed to Payment
                </button>

                <Link
                  to="/books"
                  className="mt-3 block text-center text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== Payment Modal ===== */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !paymentSuccess && setShowPayment(false)}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
            {/* Close Button */}
            {!paymentSuccess && (
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>
            )}

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-800">Complete Payment</h2>
              </div>
              <p className="text-gray-400 text-sm pl-1">Your information is secure & encrypted</p>
            </div>

            {/* Stripe Elements Wrapper */}
            <Elements stripe={stripePromise}>
              <CheckoutForm
                total={total}
                cartItems={cartItems}
                userEmail={user?.email}
                onSuccess={handlePaymentSuccess}
                onClose={() => setShowPayment(false)}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
