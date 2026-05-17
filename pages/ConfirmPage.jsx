import Footer from "../src/components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Confirmation() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#DFEDF5] flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 flex-shrink-0">
          <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-x-8">
          <a href="/books" className="text-white hover:text-blue-500 text-lg">
            <u>Books</u>
          </a>
          <a href="/journals" className="text-white hover:text-blue-500 text-lg">
            <u>Journals</u>
          </a>
          <a href="/guides" className="text-white hover:text-blue-500 text-lg">
            <u>Guides</u>
          </a>
          <a href="/magazines" className="text-white hover:text-blue-500 text-lg">
            <u>Magazines</u>
          </a>
          <a href="/dictionaries" className="text-white hover:text-blue-500 text-lg">
            <u>Dictionaries</u>
          </a>
          <a href="/reserves" className="text-white hover:text-blue-500 text-lg">
            <u>Reserves</u>
          </a>
        </div>
        {/* Desktop Right */}
        <div className="hidden md:flex items-center ml-auto">
          <FaSearch className="text-white text-lg mr-4" />
          <div className="h-8 w-px bg-white mx-2"></div>
          <a href="/login" className="text-white hover:text-blue-500 text-lg">
            <u>Log in</u>
          </a>
        </div>
        {/* Hamburger Icon */}
        <button
          className="flex flex-col justify-center items-center md:hidden ml-auto h-10 w-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px]">
          {["Books", "Journals", "Guides", "Magazines", "Dictionaries", "Reserves"].map((item) => (
            <a key={item} href={`/${item.toLowerCase()}`} className="text-white hover:text-blue-500 py-2 text-lg w-full text-center border-b border-blue-200">
              <u>{item}</u>
            </a>
          ))}
          <div className="flex items-center w-full">
            <div className="h-6 w-px bg-blue-200 mx-auto"></div>
          </div>
          <a href="/login" className="text-white hover:text-blue-500 py-2 text-lg w-full text-center">
            <u>Log in</u>
          </a>
        </div>
      )}

      <div className="flex-grow bg-[#a3f0ff] py-12 px-6 flex flex-col items-center text-center font-serif">
        <div className="bg-[#424593] text-white py-10 px-6 rounded-lg shadow-lg w-full max-w-xl">
          <img src="submit2.png" alt="Thank You" className="w-full mx-auto mb-4" />
        </div>
        <div className="bg-white mt-6 py-6 px-6 rounded-md shadow-md w-full max-w-xl">
          <h2 className="text-2xl font-bold text-black mb-2">Book Borrowed Successfully !</h2>
          <p className="text-gray-800 text-lg mb-4">
            Please collect your book from the library office and keep a track on the return date.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-600 text-white font-bold px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
}

export default Confirmation;
