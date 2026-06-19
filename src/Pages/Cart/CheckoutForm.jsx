import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxios from "../../Hook/useAxios";
import { FaLock, FaCreditCard } from "react-icons/fa";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1f2937",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#9ca3af" },
      iconColor: "#0d9488",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
};

const CheckoutForm = ({ total, cartItems, userEmail, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // 1. Get client secret from backend
      const { data } = await axiosInstance.post("/create-payment-intent", {
        amount: total,
      });

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: userEmail },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setTransactionId(result.paymentIntent.id);
        onSuccess(result.paymentIntent.id);
      }
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (transactionId) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">Payment Successful! 🎉</h3>
        <p className="text-gray-500 text-sm mb-3">Thank you for your purchase.</p>
        <p className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg font-mono break-all mb-5">
          TxnID: {transactionId}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-bold shadow-md hover:from-teal-600 hover:to-teal-700 hover:shadow-lg transition-all duration-200"
        >
          Done ✓
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Card Number Section */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaCreditCard className="text-teal-500" />
          Card Information
        </label>
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all duration-200">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-xs text-gray-400 mt-1.5 pl-1">
          Test card: <span className="font-mono text-gray-600">4242 4242 4242 4242</span> · Any future date · Any CVC
        </p>
      </div>

      {/* Order Items Summary */}
      <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
        <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">Order ({cartItems.length} items)</p>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between text-xs text-gray-600">
              <span className="truncate mr-2">{item.title} × {item.quantity || 1}</span>
              <span className="font-semibold shrink-0">৳{(parseFloat(item.price) * (item.quantity || 1)).toFixed(0)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-teal-200 mt-2 pt-2 flex justify-between font-bold text-teal-800">
          <span>Total</span>
          <span>৳{total.toFixed(0)}</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 flex items-start gap-2">
          <span className="text-red-500 mt-0.5">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3.5 rounded-xl font-bold text-base shadow-md hover:from-teal-600 hover:to-teal-700 hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          <>
            <FaLock className="text-sm" />
            Pay ৳{total.toFixed(0)} Securely
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
        <FaLock className="text-xs" /> Secured by Stripe
      </p>
    </form>
  );
};

export default CheckoutForm;
