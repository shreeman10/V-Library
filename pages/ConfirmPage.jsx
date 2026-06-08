import Footer from "../src/components/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../src/components/Navbar";

function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#DFEDF5] flex flex-col">
      {/* Navbar */}
      <Navbar />

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
