import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";


const authorsData = [
  { author: "J.K. Rowling" },
  { author: "George R.R. Martin" },
  { author: "Haruki Murakami" },
  { author: "Chimamanda Ngozi Adichie" },
  { author: "Gabriel García Márquez" },
  { author: "Jane Austen" },
  { author: "Mark Twain" },
  { author: "Leo Tolstoy" },
  { author: "F. Scott Fitzgerald" },
  { author: "Ernest Hemingway" },
  { author: "Agatha Christie" },
  { author: "Stephen King" },
  { author: "Suzanne Collins" },
  { author: "Paulo Coelho" },
  { author: "Victor Hugo" },
  { author: "Fyodor Dostoevsky" },
];

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const authorsPerPage = 8;

  useEffect(() => {
    AOS.init();
    // Simulate fetching
    setTimeout(() => {
      setAuthors(authorsData);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <p className="text-center mt-20 text-xl font-semibold">Loading...</p>;
  }

  // Filter authors by first letter match
  const filteredAuthors = authors.filter((author) =>
    author.author.toLowerCase().startsWith(searchTerm.trim().toLowerCase())
  );

  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);
  const startIndex = (currentPage - 1) * authorsPerPage;
  const currentAuthors = filteredAuthors.slice(
    startIndex,
    startIndex + authorsPerPage
  );

  return (
    <div>
      {/* Banner */}
      <div className="w-full">
        <div
          className="relative h-[250px] w-full bg-no-repeat bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/XZyKYx2D/portrait-young-woman-standing-against-white-background-1048944-25390971.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <p className="relative z-10 ml-[70%] text-white text-lg md:text-xl font-semibold bg-black/50 px-4 py-2 rounded">
            Home &gt;&gt; ALL Authors
          </p>
        </div>
      </div>

      <div className="px-10 py-6">
        <p className="py-8 text-lg font-medium">
          At BdBooks, authors shape captivating narratives across genres, from
          traditional to e-books. In our literary haven, they share diverse
          stories, enriching our shelves with a kaleidoscope of voices. This
          collaborative space celebrates the synergy between authors and
          publishers, fostering creativity without bounds.
        </p>

        <div className="mb-6">
          <hr />
          <div className="text-center p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 px-4 rounded-2xl border border-gray-300 w-1/2"
              placeholder="Search author by first letter"
            />
          </div>
          <hr />
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
          {currentAuthors.length > 0 ? (
            currentAuthors.map((author, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-duration="1500"
                className="p-4 border flex flex-col items-center rounded-lg shadow-md transition-all cursor-pointer"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md">
                  <FaPencil className="text-2xl" />
                </div>
                <p className="mt-4 font-bold text-gray-800 text-xl">
                  {author.author}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-red-500 font-semibold">
              No authors found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === idx + 1
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Author;
