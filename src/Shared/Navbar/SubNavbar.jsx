
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const SubNavbar = () => {
    return (
        <div className="bg-gray-100 hidden lg:flex"> {/* hidden on small screens */}
            <div className="flex flex-row items-center justify-between py-2 text-sm mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 gap-70">

                {/* Subscribe Form */}
                <form className="relative w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Sign Up for our emails"
                        className="text-xs py-2 px-4 pr-24 w-full lg:w-auto bg-slate-100 rounded-full"
                    />
                    <button className="bg-teal-600 text-white px-3 rounded-full text-xs absolute right-1 top-1/2 -translate-y-1/2 py-1">
                        Subscribe
                    </button>
                </form>

                {/* Text */}
                <p className="text-slate-500 text-center lg:text-center">
                    Every purchase financially supports local independent bookstores!
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-2">
                    Follow us:
                    <ul className="flex gap-2 ml-2">
                        <li><button className="p-1 hover:text-teal-600"><FaFacebook /></button></li>
                        <li><button className="p-1 hover:text-teal-600"><FaInstagram /></button></li>
                        <li><button className="p-1 hover:text-teal-600"><FaTwitter /></button></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default SubNavbar;
