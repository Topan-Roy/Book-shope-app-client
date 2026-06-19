import { useEffect, useState } from "react";
import { FaCheckCircle, FaShoppingCart, FaTimes } from "react-icons/fa";

const CartToast = ({ book, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide in
    const showTimer = setTimeout(() => setVisible(true), 10);
    // Auto dismiss after 3s
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400); // wait for slide-out animation
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "90px",
        right: "20px",
        zIndex: 9999,
        transform: visible ? "translateX(0)" : "translateX(120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
        minWidth: "320px",
        maxWidth: "380px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 20px rgba(13,148,136,0.15)",
          overflow: "hidden",
          border: "1px solid rgba(13,148,136,0.15)",
        }}
      >
        {/* Green progress bar on top */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #0d9488, #14b8a6)",
            animation: "shrink 3s linear forwards",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px" }}>
          {/* Book image */}
          {book?.img && (
            <div
              style={{
                width: "52px",
                height: "68px",
                borderRadius: "8px",
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={book.img}
                alt={book.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Text Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <FaCheckCircle style={{ color: "#0d9488", fontSize: "15px", flexShrink: 0 }} />
              <span
                style={{
                  color: "#0d9488",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Added to Cart
              </span>
            </div>
            <p
              style={{
                color: "#1f2937",
                fontWeight: 700,
                fontSize: "14px",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {book?.title}
            </p>
            <p style={{ color: "#6b7280", fontSize: "12px", margin: "2px 0 0 0" }}>
              by {book?.author} &nbsp;·&nbsp;
              <span style={{ color: "#0d9488", fontWeight: 600 }}>৳{book?.price}</span>
            </p>
          </div>

          {/* Cart Icon Badge */}
          <div
            style={{
              width: "38px",
              height: "38px",
              background: "linear-gradient(135deg, #0d9488, #14b8a6)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(13,148,136,0.35)",
            }}
          >
            <FaShoppingCart style={{ color: "white", fontSize: "16px" }} />
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9ca3af",
            fontSize: "12px",
            padding: "2px",
            lineHeight: 1,
          }}
        >
          <FaTimes />
        </button>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default CartToast;
