import { useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5 সেকেন্ড fake loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loading></Loading>
      
    );
  }

  return (
    <div className="lg:px-10 md:px-5 px-2 bg-[#f9f9f1] text-[#333] pb-12">
      <div className="px-4">
        <h1 className="text-3xl py-5">About Us</h1>
        <h2 className="text-2xl font-bold">The Bookistry</h2>
        <div className="mt-4 flex items-start flex-wrap">
          <img
            src="https://i.ibb.co.com/2hzVSbx/Imageby-Stanislav-Kondratievvia-Unsplash.webp"
            className="md:w-4/4 rounded-lg shadow-lg mx-auto"
            alt=""
          />
          <p className="text-gray-700 leading-relaxed md:text-xl">
            Nestled in the heart of the city, The Bookistry is more than just a
            bookstore – it’s a sanctuary for book lovers. Our shop is designed
            to inspire curiosity and ignite your imagination, offering a
            curated collection of books from all genres. Whether you’re
            searching for the latest bestseller, a timeless classic, or a
            hidden gem, we have something for everyone. <br />
            Step inside and you’ll be greeted by the warm glow of soft lighting
            and the comforting scent of books. Wooden shelves line the walls,
            filled with carefully selected titles. A cozy reading nook with
            plush armchairs invites you to sit down and lose yourself in a
            story. For those who enjoy a good read with a cup of coffee, our
            small coffee corner serves freshly brewed beverages and pastries.
            <br />
            At The Bookistry, we believe in the power of stories to connect,
            inspire, and transform. Our mission is to create a welcoming space
            where readers of all ages and backgrounds can come together to
            explore, learn, and grow.
            <br />
            We’re located at <strong>2nd Floor Rifat Tower Tejgaon, Dhaka</strong>, open{" "}
            <strong>Saturday - Thusday : 9:00 AM - 8:00 PM</strong>. Stop by and
            discover your next great read. We can’t wait to welcome you to The
            Bookistry.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-12 rounded-lg mt-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            How It Works
            <span className="text-base font-normal block">
              (and how your purchases help bookstores)
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="../../../public/62f53a0ab5f1511d391ec6ad_bouncing.gif"
                alt="Pick a Store"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Pick A Store</h3>
              <p className="text-gray-700">
                Visit our <a href="#" className="text-blue-500 hover:underline">find a local bookstore</a> page and select the bookstore you'd like to support. If you don't choose a store, you'll contribute to our profit sharing pool that helps all our stores.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="../../../public/62f53a0ab5f15155621ec6b5_about2-p-500.jpg"
                alt="Buy a Book"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Buy a Book</h3>
              <p className="text-gray-700">
                Your order will be filled directly by our distributor, and the full profit from your purchase will be sent to the bookstore you selected.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="../../../public/62f53a0ab5f151b01e1ec6af_about1-p-500.jpg"
                alt="Check the Mail"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Check the Mail</h3>
              <p className="text-gray-700">
                You'll receive a confirmation and tracking number when your order is placed, and our in-house customer service team will be standing by if you have issues or returns.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="../../../public/62f53a0ab5f151fbbb1ec6b2_about3-p-500.jpg"
                alt="Help Bookstores"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Help Bookstores</h3>
              <p className="text-gray-700">
                We donate profits directly to bookstores—both the funds from direct purchases and our profit pool that's split between our 2,000+ stores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
