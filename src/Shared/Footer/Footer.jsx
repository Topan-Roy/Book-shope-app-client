import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 mt-10 text-[#050505]">
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Section */}
          <div>
            <img
              src="https://i.ibb.co.com/VmX711W/images-removebg-preview.png"
              alt="Bookistry"
              className="h-[80px] w-36 object-cover"
            />
            <p className="mt-2 max-w-xs">
              Connecting readers with stories since 2025. Explore our curated
              collection of new and used books. Where every page holds a new
              adventure.
            </p>

            {/* Social Links */}
            <ul className="mt-6 flex gap-5 text-lg">
              <li>
                <a href="#" className="hover:text-teal-600 transition">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-600 transition">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-600 transition">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-600 transition">
                  <FaGithub />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-600 transition">
                  <FaDribbble />
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:col-span-2">
            {/* Need Help */}
            <div>
              <h3 className="font-semibold mb-3">NEED HELP</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-75">+880 1800122288</a></li>
                <li><a href="#" className="hover:opacity-75">bookistry@gmail.com</a></li>
                <li><a href="#" className="hover:opacity-75">2nd Floor, Rifat Tower, Tejgaon, Dhaka</a></li>
                <li><a href="#" className="hover:opacity-75">Sat - Thu: 9:00 AM - 8:00 PM</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-3">SERVICES</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-75">Branding</a></li>
                <li><a href="#" className="hover:opacity-75">Design</a></li>
                <li><a href="#" className="hover:opacity-75">Advertisement</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-3">COMPANY</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-75">About</a></li>
                <li><a href="#" className="hover:opacity-75">Contact</a></li>
                <li><a href="#" className="hover:opacity-75">Jobs</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-3">LEGAL</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-75">Terms of Use</a></li>
                <li><a href="#" className="hover:opacity-75">Returns Policy</a></li>
                <li><a href="#" className="hover:opacity-75">Refund Policy</a></li>
                <li><a href="#" className="hover:opacity-75">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-10 pt-5 text-sm font-semibold text-center">
          Copyright &copy; 2025{" "}
          <a href="#" className="text-[#80391d] font-bold hover:underline">
            Bookistry
          </a>{" "}
          - All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
