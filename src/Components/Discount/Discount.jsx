import { Link } from "react-router";

const Discount = () => {
  return (
    <div className=" container mx-auto">
      <div className="flex flex-col lg:flex-row justify-between gap-6 p-2">
        {/* Book 20% gift card */}
        <div className="bg-gray-50 border font-[sans-serif] relative shadow-lg shadow-[#e9d9f3]  mx-auto rounded-3xl overflow-hidden cursor-pointer w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:gap-6">
            <div className="text-center p-6 md:py-16 flex flex-col justify-center items-center ">
              <h3 className="font-extrabold text-xl md:text-5xl text-[#095c58] leading-tight">
                <span className="text-gray-800">Book </span>20% gift
              </h3>
              <h6 className="text-lg text-gray-800 mt-4">
                It all begins with a great book!
              </h6>
            </div>
            <div className="relative flex justify-center sm:justify-end items-center p-2 bg-gradient-to-b  bg-[#9e3183] rounded-bl-[230px] w-full h-full">
              <div className="h-44 w-44 lg:h-72 lg:w-72 rounded-full bg-gradient-to-tr p-5">
                <img
                  src="https://i.ibb.co.com/jGwLndt/155789192-books-and-eyeglasses-on-a-wooden-table-on-purple-trendy-soft-background.jpg"
                  className="w-full h-full rounded-full object-cover border-8 border-white "
                  alt="img"
                  width={288}
                  height={288}
                />
              </div>
              <h6 className="absolute top-2 left-2 text-sm md:text-sm text-gray-300 leading-tight text-start font-semibold">
                <p className="font-extrabold text-base md:text-lg text-white leading-tight">
                  BookNest20{" "}
                </p>
                Coupon Code
              </h6>
            </div>
          </div>
        </div>
        {/* sale 10% card */}
        <div className="bg-gray-50 border font-[sans-serif] relative shadow-lg shadow-[#e9d9f3] mx-auto rounded-3xl overflow-hidden cursor-pointer w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:gap-6">
            <div className="text-center p-6 flex flex-col justify-center items-center">
              <h3 className="font-extrabold text-xl md:text-5xl text-[#1a681b] leading-tight">
                <span className="text-gray-800">Sale</span> 10% Off
              </h3>
              <h6 className="text-lg text-gray-800 mt-4">
                It all begins with a great book!
              </h6>

              <Link to={"/"}>
                <button
                  type="button"
                  className="bg-[#ec4bc4] hover:bg-[#b06ec0af] text-black tracking-wide font-semibold text-sm py-3 px-6 rounded-xl mt-4 md:mt-8"
                >
                  Shop Now
                </button>
              </Link>
            </div>

            <div className="relative flex justify-center sm:justify-end items-center p-2 bg-gradient-to-b from-[#f4fe68] to-[#d4d405] rounded-bl-[230px] w-full h-full">
              <div className="h-44 w-44 lg:h-72 lg:w-72 rounded-full bg-gradient-to-tr  p-5">
                <img
                  src="https://i.ibb.co.com/Gxqk7XC/book-composition-with-open-book-23-2147690555.jpg"
                  className="w-full h-full rounded-full object-cover border-8 border-white "
                  alt="img"
                  width={288}
                  height={288}
                />
              </div>
              <h6 className="absolute top-2 left-2 text-sm md:text-sm text-gray-800 leading-tight text-start font-semibold">
                <p className="font-extrabold text-base md:text-lg text-black leading-tight">
                  BookNest10{" "}
                </p>
                Coupon Code
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
