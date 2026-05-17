import Footer from "../src/components/Footer";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Dictionaries() {
  const [menuOpen, setMenuOpen] = useState(false);

  const dictionaryList = [
    {
      title: "Oxford English Dictionary",
      desc: "The definitive record of the English language, featuring historical and contemporary meanings.",
      link: "https://www.oed.com/",
    },
    {
      title: "Cambridge Dictionary",
      desc: "Free online dictionary with definitions, thesaurus, pronunciation, grammar, and translations.",
      link: "https://dictionary.cambridge.org/",
    },
    {
      title: "Merriam-Webster",
      desc: "American dictionary with word meanings, games, quizzes, and language trends.",
      link: "https://www.merriam-webster.com/",
    },
    {
      title: "Collins Dictionary",
      desc: "English dictionary with grammar guides and bilingual support for students.",
      link: "https://www.collinsdictionary.com/",
    },
    {
      title: "WordReference",
      desc: "Translation dictionary for English, Spanish, French, and more with grammar forums.",
      link: "https://www.wordreference.com/",
    },
    {
      title: "Hindi-English Dictionary",
      desc: "Comprehensive bilingual dictionary for Hindi to English and vice versa.",
      link: "https://www.shabdkosh.com/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F9FF] flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          <a href="/dashboard" className="text-white hover:text-blue-500 text-lg"><u>Dashboard</u></a>
          <a href="/books" className="text-white hover:text-blue-500 text-lg"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-500 text-lg"><u>Journals</u></a>
          <a href="/guides" className="text-white hover:text-blue-500 text-lg"><u>Guides</u></a>
          <a href="/magazines" className="text-white hover:text-blue-500 text-lg"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 text-lg"><u>Dictionaries</u></a>
          <a href="/search-books" className="text-white hover:text-blue-500 text-lg"><u>Search Books</u></a>
          <a href="/reserves" className="text-white hover:text-blue-500 text-lg"><u>Reserves</u></a>
        </div>
        <div className="hidden md:flex items-center ml-auto">
          <FaSearch className="text-white text-lg mr-4" />
          <div className="h-8 w-px bg-white mx-2"></div>
          <a href="/login" className="text-white hover:text-blue-500 text-lg"><u>Log in</u></a>
        </div>
        <button
          className="flex flex-col justify-center items-center md:hidden ml-auto h-10 w-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px]">
          <a href="/dashboard" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Dashboard</u></a>
          <a href="/books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Books</u></a>
          <a href="/journals" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Journals</u></a>
          <a href="/guides" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Guides</u></a>
          <a href="/magazines" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Magazines</u></a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Dictionaries</u></a>
          <a href="/search-books" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Search Books</u></a>
          <a href="/reserves" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200"><u>Reserves</u></a>
          <div className="flex items-center w-full">
            <div className="h-6 w-px bg-blue-200 mx-auto"></div>
          </div>
          <a href="/login" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center"><u>Log in</u></a>
        </div>
      )}

      <div className="py-16 px-4 md:px-12 pt-[30px]">
        <h2 className="text-2xl md:text-[40px] text-center font-bold mb-6 pb-[12px]" style={{color:"#605fe6", fontFamily:"cavaet"}}>
        <b>Explore Our Dictionary Portal</b>
      </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Accurate meanings, translations, grammar tools, and thesaurus — all in one place for your reference needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {dictionaryList.map((dict, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-[#605fe6] mb-2">{dict.title}</h3>
              <p className="text-gray-700 mb-4">{dict.desc}</p>
              <a
                href={dict.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#605fe6] hover:bg-[#424593] text-white px-4 py-2 rounded font-semibold transition"
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
  );
}

export default Dictionaries;
