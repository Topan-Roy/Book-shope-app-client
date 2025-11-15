import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../Hook/useAxios";
import { AuthContext } from "../../Contexts/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { login, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Please fill in all fields!",
      });
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Firebase login
      await login(email, password);

      // 2️⃣ Get user from MongoDB server
      const response = await axiosInstance.get(`/users/${email}`);
      if (!response.data.user) {
        Swal.fire({
          icon: "error",
          title: "User not found in server!",
        });
        setLoading(false);
        return;
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();
      navigate("/"); // অথবা যেকোনো protected route

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: err.message.includes("auth/user-not-found") ? "User not found" :
               err.message.includes("auth/wrong-password") ? "Wrong password" :
               "Login Failed",
      });
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await googleLogin();
      const email = result.user.email;

      // Check MongoDB server
      const response = await axiosInstance.get(`/users/${email}`);
      if (!response.data.user) {
        // Optionally create user in MongoDB if not exists
        await axiosInstance.post("/register", {
          name: result.user.displayName,
          email,
          role: "user",
        });
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Google Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 lg:px-14 px-5">
      <div className="md:flex items-center justify-center">
        <div className="w-full">
          <img
            src="https://i.ibb.co.com/4RL2PxQ/17133825331.jpg"
            alt="Banner"
          />
        </div>
        <div className="bg-base-200 dark:bg-white dark:text-black px-4 py-4 lg:max-w-3xl">
          <form onSubmit={handleLogin} className="mt-8 gap-6">
            <div className="mb-2">
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" required className="mt-1 py-2 px-5 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" required className="mt-1 px-5 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-7 mt-3">
              <label htmlFor="MarketingAccept" className="flex gap-4">
                <input type="checkbox" name="marketing_accept" className="size-5 rounded-md border-gray-200 bg-white shadow-sm" />
                <span className="text-sm text-gray-700">
                  I want to receive emails about events, updates and announcements.
                </span>
              </label>
            </div>

            <div className="mb-7 sm:flex sm:items-center sm:gap-4">
              <button type="submit" disabled={loading} className="inline-block shrink-0 rounded-md border bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none">
                {loading ? "Loading..." : "Login"}
              </button>
              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Don't have an account? <Link to="/registation" className="text-gray-700 underline">Register</Link>
              </p>
            </div>

            <div>
              <button type="button" disabled={loading} className="border flex py-1 px-2 justify-center items-center gap-1 rounded-full" onClick={handleGoogleLogin}>
                <FaGoogle className="text-[28px]" /> <span>Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
