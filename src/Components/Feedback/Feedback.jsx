
function Feedback() {
  
  return (
    <div className="dark:bg-white">
      <section className="pb-8 mx-auto max-w-7xl">
        <div className="py-4 text-center md:py-8">
          <h4 className="text-base font-bold tracking-wide text-center uppercase text-[#FC7E01]">
            Customer Reviews
          </h4>
          <p className="mt-2 tracking-tight text-gray-900 dark:text-white text-2xl md:text-4xl">
            What Our Readers Say
          </p>
        </div>

        <div className="gap-8 space-y-8 md:columns-2 lg:columns-3">
          {/* Feedback Card */}
          {[
            {
              name: "Arif Hossain",
              role: "College Student",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
              text: "I found all the books I needed for my semester here. Fast delivery and great packaging. The discounts on academic books are unbeatable!",
              aos: "fade-right",
            },
            {
              name: "Sima Akter",
              role: "Book Lover",
              img: "https://randomuser.me/api/portraits/women/34.jpg",
              text: "The collection of novels and poetry is amazing! I got my favorite author's latest release with a special bookmark. Highly recommended for fellow readers!",
              aos: "fade-left",
            },
            {
              name: "Rakib Ahmed",
              role: "Freelance Writer",
              img: "https://randomuser.me/api/portraits/men/67.jpg",
              text: "This book shop has a fantastic section for writing guides and literature. The website is user-friendly, and I love their quick support.",
              aos: "fade-right",
            },
            {
              name: "Nazma Begum",
              role: "Primary School Teacher",
              img: "https://randomuser.me/api/portraits/women/55.jpg",
              text: "I bought storybooks for my students, and they absolutely love them. Colorful illustrations and engaging content make learning fun.",
              aos: "fade-left",
            },
            {
              name: "Imran Kabir",
              role: "Bookstore Owner",
              img: "https://randomuser.me/api/portraits/men/39.jpg",
              text: "As a small bookstore owner, I source many of my titles from here. Their wholesale prices and prompt service help me keep my customers happy.",
              aos: "fade-right",
            },
            {
              name: "Farzana Rahman",
              role: "Parent",
              img: "https://randomuser.me/api/portraits/women/42.jpg",
              text: "My children love the activity books and educational materials I got from this shop. The quality is excellent, and it helps them stay engaged.",
              aos: "fade-left",
            },
          ].map((item, index) => (
            <div
              key={index}
              data-aos={item.aos}
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1500"
              className="p-8 bg-white border border-gray-100 shadow-2xl rounded-3xl shadow-gray-600/10"
            >
              <div className="flex gap-4 items-start">
                <img
                  className="w-12 h-12 rounded-full"
                  src={item.img}
                  alt={`${item.name} avatar`}
                  loading="lazy"
                />
                <div className="flex-1 flex justify-between items-start">
                  <div>
                    <h6 className="text-lg font-medium text-gray-700">{item.name}</h6>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
              <p className="mt-8">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Feedback;
