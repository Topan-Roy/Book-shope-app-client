import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../Hook/useAxios";
import { AuthContext } from "../../Contexts/AuthProvider";

const Registration = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { createUser } = useContext(AuthContext); // Firebase createUser
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Please fill in all fields!",
      });
      setLoading(false);
      return;
    }

   try {
  // 1️⃣ Create user in Firebase
  await createUser(email, password);

  // ✅ Firebase user created successfully, save in MongoDB
  const response = await axiosInstance.post("/register", {
    name,
    email,
    password,
    role: "user",
  });

  if (response.data?.success) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registration Successful",
      showConfirmButton: false,
      timer: 1500,
    });
    form.reset();
    navigate("/");
  } else {
    Swal.fire({
      icon: "error",
      title: response.data?.message || "Registration Failed",
    });
  }
} catch (error) {
  // ✅ Firebase error handle
  if (error.code === "auth/email-already-in-use") {
    Swal.fire({
      icon: "error",
      title: "Email already exists!",
      text: "Please use a different email or login.",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Server/Firebase Error!",
      text: error.message,
    });
  }
}


    setLoading(false);
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
          <form onSubmit={handleRegister} className="mt-8 gap-6">

            <div className="mb-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 py-2 px-5 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 py-2 px-5 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 px-5 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="mb-7 mt-3">
              <label htmlFor="MarketingAccept" className="flex gap-4">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                />
                <span className="text-sm text-gray-700">
                  I want to receive emails about events, updates and announcements.
                </span>
              </label>
            </div>

            <div className="mb-7 sm:flex sm:items-center sm:gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-block shrink-0 rounded-md border bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none"
              >
                {loading ? "Loading..." : "Create Account"}
              </button>

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?{" "}
                <Link to="/login" className="text-gray-700 underline">
                  Log in
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
