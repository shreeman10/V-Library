import Footer from "../src/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation

function SelectPage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!role) {
      alert("Please select a role before continuing.");
      return;
    }

    // Save role (optional)
    localStorage.setItem("selectedRole", role);

    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-200 via-cyan-100 to-cyan-200 flex flex-col">
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
          <div className="h-8 w-px bg-white mx-2"></div>
          <div className="log-in py-2">
            <a href="#" className="text-white hover:text-blue-500 text-lg"><u>Log in</u></a>
          </div>
        </div>
      </div>

      {/* // write your code here */}
      <div className="flex justify-center items-center flex-grow py-12">
        <div className="bg-white/70 backdrop-blur-md shadow-lg border border-gray-300 w-full max-w-md p-8 rounded-xl font-serif flex flex-col items-center space-y-6">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-green-400 text-black font-semibold text-xl px-6 py-3 rounded-md w-full text-center cursor-pointer hover:bg-green-500"
          >
            <option value="">Select your role ▼</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleNext}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-2 rounded-full transition-all duration-300"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-red-600 text-white text-sm md:text-base text-center px-4 py-2 font-semibold">
        ⚠️ Only college-issued Outlook email IDs are allowed. <br />
        Please use your official VIT Mumbai email (e.g., <span className="font-mono">name@vit.edu.in</span>)
      </div>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
}

export default SelectPage;
