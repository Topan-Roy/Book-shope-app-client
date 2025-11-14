const blogData = {
  categories: [
    { name: "Book Reviews", count: 1 },
    { name: "Free Pdf Download", count: 1 },
    { name: "Literary News and Events", count: 1 },
    { name: "Popular Blog", count: 2 },
  ],

  popularPosts: [
    {
      title:
        "কাজে আসার আবেক গল্প: প্রেম, হত্যা ও হারান লিঙ্কের Free Pdf Download.",
      date: "February 7, 2024",
      comments: "No Comments",
      image: "https://i.ibb.co/YHB2qzV/ljt-NEW-Sit-In-10-13-23.webp",
    },
    {
      title:
        '২০২৪ সালে প্রকাশিত হচ্ছে আরিফ আজাদের নতুন বই "শায়াতের দিন ফুরোবে"',
      date: "January 29, 2024",
      comments: "No Comments",
      image: "https://i.ibb.co/hRmn4RL/download-3.jpg",
    },
    {
      title:
        '২০২৪ সালে প্রকাশিত হচ্ছে আরিফ আজাদের নতুন বই "শায়াতের দিন ফুরোবে"',
      date: "January 29, 2024",
      comments: "No Comments",
      image: "https://i.ibb.co/qF06BD5Q/images-2.jpg",
    },
    {
      title:
        '২০২৪ সালে প্রকাশিত হচ্ছে আরিফ আজাদের নতুন বই "শায়াতের দিন ফুরোবে"',
      date: "January 29, 2024",
      comments: "No Comments",
      image: "https://i.ibb.co/hRmn4RL/download-3.jpg",
    },
  ],
};

const Sidebar = () => {
  return (
    <div className="md:w-[400px] p-4 border-b-gray-200 mt-10 bg-gray-200 shadow-lg rounded-lg">

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-2">
          ব্লগ ক্যাটাগরি
        </h2>

        <ul>
          {blogData.categories.map((category, index) => (
            <li
              key={index}
              className="flex justify-between py-1 text-gray-700"
            >
              {category.name}
              <span>({category.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-2">
          জনপ্রিয় পোস্ট
        </h2>

        {blogData.popularPosts.map((post, index) => (
          <div key={index} className="flex items-center mb-4 border-b pb-2">
            <img
              src={post.image}
              alt={post.title}
              className="w-16 h-16 rounded-lg mr-4 object-cover"
            />

            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {post.title}
              </h3>

              <p className="text-xs text-gray-500">
                {post.date} • {post.comments}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;
