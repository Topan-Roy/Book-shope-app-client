import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Feedback() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const reviews = [
    {
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "Arif Hossain",
      role: "College Student",
      text: "I found all the books I needed for my semester here. Fast delivery and great packaging. The discounts on academic books are unbeatable!",
      aos: "fade-right",
    },
    {
      img: "https://randomuser.me/api/portraits/women/34.jpg",
      name: "Sima Akter",
      role: "Book Lover",
      text: "The collection of novels and poetry is amazing! I got my favorite author's latest release with a special bookmark. Highly recommended!",
      aos: "fade-left",
    },
    {
      img: "https://randomuser.me/api/portraits/men/67.jpg",
      name: "Rakib Ahmed",
      role: "Freelance Writer",
      text: "Fantastic writing guides and literature collection. The website is user-friendly!",
      aos: "fade-right",
    },
    {
      img: "https://randomuser.me/api/portraits/women/55.jpg",
      name: "Nazma Begum",
      role: "Primary School Teacher",
      text: "Bought storybooks for my students — they absolutely love them!",
      aos: "fade-left",
    },
    {
      img: "https://randomuser.me/api/portraits/men/39.jpg",
      name: "Imran Kabir",
      role: "Bookstore Owner",
      text: "Wholesale prices and prompt service help me keep my customers happy.",
      aos: "fade-right",
    },
    {
      img: "https://randomuser.me/api/portraits/women/42.jpg",
      name: "Farzana Rahman",
      role: "Parent",
      text: "My children love the activity books and educational materials. Excellent quality!",
      aos: "fade-left",
    },
  ];

  return (
    <div className="dark:bg-white">
      <section className="pb-8 mx-auto max-w-7xl">
        
        {/* Heading Section */}
        <div className="py-4 text-center md:py-8">
          <h4 className="text-base font-bold tracking-wide uppercase text-[#FC7E01]">
            Customer Reviews
          </h4>
          <p className="mt-2 tracking-tight text-gray-900 dark:text-white text-2xl md:text-4xl">
            What Our Readers Say
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="gap-8 space-y-8 md:columns-2 lg:columns-3">
          {reviews.map((item, index) => (
            <ReviewCard key={index} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Feedback;


// ⭐ Reusable Component
function ReviewCard({ aos, img, name, role, text }) {
  return (
    <div
      data-aos={aos}
      className="p-8 bg-white border border-gray-100 shadow-2xl rounded-3xl shadow-gray-600/10 
      flex flex-col h-full min-h-[250px] max-w-[350px]"
    >
      <div className="flex gap-4 items-start">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={img}
          alt={name}
          loading="lazy"
        />

        <div className="flex-1">
          <h6 className="text-lg font-medium text-gray-800">{name}</h6>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <p className="mt-6 text-gray-700 flex-1">
        {text}
      </p>

     
    </div>
  );
}

