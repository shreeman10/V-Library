import Footer from "../src/components/Footer";
import { useState } from "react";
import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import Navbar from "../src/components/Navbar";

function Journals() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCal, setShowCal] = useState(false);

  // Get today's date in desired format
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Example journals data
  const journals = [
    {
      title: "IEEE Xplore",
      desc: "Access to IEEE journals, conferences, and standards in engineering and technology.",
      link: "https://ieeexplore.ieee.org/",
      type: "International",
    },
    {
      title: "Springer Journals",
      desc: "Wide range of scientific, technical, and medical journals.",
      link: "https://link.springer.com/",
      type: "International",
    },
    {
      title: "Indian Journals",
      desc: "Collection of national journals across various disciplines.",
      link: "https://www.indianjournals.com/",
      type: "National",
    },
    {
      title: "ACM Digital Library",
      desc: "Comprehensive collection of ACM publications and resources.",
      link: "https://dl.acm.org/",
      type: "International",
    },
    {
      title: "Economic Outlook (CMIE)",
      desc: "Indian economic and industry data and journals.",
      link: "https://www.cmie.com/",
      type: "National",
    },
    {
      title: "Nature Publishing Group",
      desc: "Leading science journals including Nature and Scientific American.",
      link: "https://www.nature.com/",
      type: "International",
    },
    // Add more as needed
  ];

  return (
    <>
      <div className="min-h-screen bg-[#DFEDF5] flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <div className="hero relative">
          {/* Hero Image with blur */}
          <div
            className="w-full h-60 md:h-[400px] bg-cover bg-center"
            style={{
              backgroundImage: "url('/jornals2.jpg')",
              filter: "blur(4px)",
              WebkitFilter: "blur(4px)",
            }}
          ></div>
          {/* Overlay to darken the blurred image for better contrast */}
          <div className="absolute inset-0 w-full h-60 md:h-[400px] bg-black/20 pointer-events-none"></div>
          {/* Glassmorphism Card */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 p-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#424593] mb-2 drop-shadow">
              Total Journals
            </h2>
            <div className="text-4xl md:text-5xl font-extrabold text-[#605fe6] mb-4 drop-shadow">
              {journals.length}
            </div>
            <a
              href="#journals-list"
              className="mt-2 inline-flex items-center gap-2 bg-[#605fe6] hover:bg-[#424593] text-white px-6 py-2 rounded-lg font-semibold text-lg shadow transition"
            >
              <FaSearch className="inline-block" />
              Browse Collection
            </a>
          </div>
        </div>

        {/* Journals List Section */}
        <div id="journals-list" className="content px-4 md:px-0 pt-[20px]">
          <h2 className="text-2xl md:text-[50px] text-center mt-8 mb-4">
            <b>
              <span style={{ color: "#605fe6", fontFamily: "caveat",}}>
                Explore Our Journal Collection
              </span>
            </b>
          </h2>
          <p className="text-center text-lg mb-8 text-gray-700">
            Access a wide range of national and international journals, e-journals, and databases for your academic and research needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {journals.map((journal, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#424593]">{journal.title}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                    {journal.type}
                  </span>
                  <p className="text-gray-700 mb-4">{journal.desc}</p>
                </div>
                <a
                  href={journal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block bg-[#605fe6] hover:bg-[#424593] text-white px-4 py-2 rounded font-semibold transition"
                >
                  Visit
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Footer */}
      <Footer />
      </div>
    </>
  )
}

export default Journals;