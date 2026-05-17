import Footer from "../src/components/Footer";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../src/components/Navbar";

function Magazines() {
  const [menuOpen, setMenuOpen] = useState(false);

  const magazines = [
    {
      title: "Forbes India",
      desc: "Business, entrepreneurship, and leadership insights from India and around the globe.",
      link: "https://www.forbesindia.com/",
    },
    {
      title: "Frontline",
      desc: "Covers current affairs, politics, economy, and culture with detailed reporting.",
      link: "https://frontline.thehindu.com/",
    },
    {
      title: "National Geographic",
      desc: "Explore science, environment, history, and adventure through award-winning articles.",
      link: "https://www.nationalgeographic.com/",
    },
    {
      title: "India Today",
      desc: "Latest news on Indian politics, society, and entertainment.",
      link: "https://www.indiatoday.in/magazine",
    },
    {
      title: "Scientific American",
      desc: "Popular science magazine featuring articles on science and technology.",
      link: "https://www.scientificamerican.com/",
    },
    {
      title: "Readers Digest India",
      desc: "Uplifting real-life stories, humor, and health insights.",
      link: "https://www.readersdigest.in/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F6FA] flex flex-col">
      <Navbar />

      <div className="py-16 px-4 md:px-12 pt-[30px]">
        <h2 className="text-2xl md:text-[40px] text-center font-bold mb-6 pb-[12px]" style={{color:"#605fe6", fontFamily:"cavaet"}}>
        <b>Featured Magazines</b>
      </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Stay informed and inspired with our curated collection of popular and academic magazines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {magazines.map((mag, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-[#605fe6] mb-2">{mag.title}</h3>
              <p className="text-gray-700 mb-4">{mag.desc}</p>
              <a
                href={mag.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#605fe6] hover:bg-[#424593] text-white px-4 py-2 rounded font-semibold transition"
              >
                Read Now
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
}

export default Magazines;
