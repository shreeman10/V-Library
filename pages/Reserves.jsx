import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";
import { useState, useEffect } from "react";

// --- Custom SVG Icons (to replace react-icons/fa) ---
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
// --- End SVG Icons ---

function Reserves() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dbReserves, setDbReserves] = useState([]);

  const reserveFAQs = [
    {
      question: "How do I request reserved materials?",
      answer: "Materials are requested at the Circulation Desk. Bring the course name or instructor's name to quickly locate the item.",
      link: "#request-info",
    },
    {
      question: "Can I reserve digital materials or videos?",
      answer: "Yes! Many electronic readings and videos are linked directly through your course's learning management system (e.g., Canvas).",
      link: "#digital-access",
    },
    {
      question: "What is the typical loan period for reserves?",
      answer: "The standard loan period is 2 hours for physical books. Some instructor-specified materials may be borrowed for up to 3 days.",
      link: "#loan-period",
    },
    {
      question: "Are fines applied to overdue reserve items?",
      answer: "Yes, late return of reserve materials incurs a high hourly fine to ensure availability for all students. Please return them promptly.",
      link: "#fines",
    },
  ];

  const contacts = [
    {
      name: "abc", // Reverted
      role: "Librarian", // Reverted
      phone: "", // Removed number
      email: "xyz",
      image: "https://placehold.co/64x64/424593/ffffff?text=LS", // Placeholder Image
    },
    {
      name: "abc", // Reverted
      role: "unknown", // Reverted
      phone: "", // Removed number
      email: "xyz",
      image: "https://placehold.co/64x64/01376b/ffffff?text=RP", // Placeholder Image
    },
  ];

  useEffect(() => {
      fetch("http://localhost:3000/api/reservations")
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                const mapped = data.map(r => ({
                   course: r.title,
                   item: `Reserved by ${r.full_name} (Expires ${new Date(r.expires_on).toLocaleDateString()})`
                }));
                setDbReserves(mapped);
            }
        })
        .catch(console.error);
    }, []);

  const displayReserves = dbReserves.length > 0 ? dbReserves : [
    { course: "Computer Networks", item: "Reserved Slides (3-day loan)" },
    { course: "Operating Systems", item: "E-book: Reference Copy (Digital Access)" },
    { course: "Microprocessors Lab", item: "Lab Manual (2-hour loan)" },
    { course: "Data Structures", item: "Textbook Chapter 5 (Photocopy - 2 hr)" },
  ];

  const filteredReserves = displayReserves.filter(r => 
    r.course.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F9FF] flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Left section (Reserves Info) */}
        <div className="flex-1 space-y-8">
          
          {/* Section 1: Search & Request */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-[#01376b] mb-4 border-b pb-2">
              Search Course Reserves
            </h2>
            <p className="text-gray-700 mb-4 text-sm">
              Enter a **Course Code, Course Name, or Instructor's Last Name** to find materials reserved for your class.
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="e.g., CS401, Data Structures, or Sharma"
                className="w-full p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-[#424593] focus:border-transparent transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-[#424593] text-white px-4 py-3 rounded-r-md hover:bg-[#01376b] transition duration-150 flex items-center"
                onClick={() => console.log("Searching for:", searchTerm)}
                aria-label="Search reserves"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Section 2: View Reserve Materials (Expanded List) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-[#01376b] mb-4 border-b pb-2">
              Currently Available Reserved Materials
            </h2>
            <p className="text-gray-700 mb-4 text-sm">
              Reserve materials are kept separately at the circulation desk. You can borrow them for 2 hours or up to 3 days based on your course and instructor’s settings.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#e9f0fa] text-left text-[#01376b] text-sm font-semibold">
                    <th className="p-3 border-b-2 border-gray-200">Course / Instructor</th>
                    <th className="p-3 border-b-2 border-gray-200">Material</th>
                    <th className="p-3 border-b-2 border-gray-200">Loan Period</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReserves.map((reserve, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50 transition duration-100 text-sm text-gray-700">
                      <td className="p-3">{reserve.course}</td>
                      <td className="p-3 text-blue-700 hover:underline cursor-pointer">{reserve.item}</td>
                      <td className="p-3">{reserve.item.includes('Digital') ? 'Online' : reserve.item.includes('3-day') ? '3 Days' : '2 Hours'}</td>
                    </tr>
                  ))}
                </tbody>
              </table >
            </div>
          </div>

          {/* Section 3: Reserves FAQs (Accordion Style) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-[#01376b] mb-4 border-b pb-2">
              Reserves FAQs
            </h2>
            <div className="space-y-3">
              {reserveFAQs.map((faq, idx) => (
                <Accordion key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Section 4: Instructors */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-[#01376b] mb-4 border-b pb-2">Instructors: Place Materials on Reserve</h2>
            <p className="text-gray-700 text-sm">
              Faculty can submit requests for course reserves at any time. We highly recommend submitting requests at least **two weeks** before the start of the semester.
            </p>
            <ul className="list-disc pl-6 text-blue-700 mt-4 space-y-2 text-sm">
              <li><a href="#" className="underline">Online Request Form for Reserves</a></li>
              <li><a href="#" className="underline">Guide to Course Readings in Canvas Integration</a></li>
              <li><a href="#" className="underline">Reserve Policy for Faculty</a></li>
            </ul>
          </div>
        </div>

        {/* Right section (Contact) */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 sticky top-24">
            <h2 className="text-xl font-bold text-[#01376b] mb-4 border-b pb-2">Reserves Contact</h2>
            {contacts.map((person, idx) => (
              <div key={idx} className="flex items-start mb-6 border-b pb-4 last:border-b-0 last:pb-0">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-16 h-16 rounded-full shadow-md object-cover mr-4 flex-shrink-0"
                  // Added onerror to handle potential image loading issues gracefully
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/cccccc/333333?text=Staff"; }} 
                />
                <div>
                  <h3 className="text-[#424593] font-semibold">{person.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{person.role}</p>
                  {/* Removed phone display conditional on person.phone being an empty string */}
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="text-blue-700 text-sm hover:underline">
                      📧 {person.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion Component (Helper for FAQs) */}
      <AccordionStyles /> {/* Tailwind fix for single-file styling */}

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
}

// Helper component for FAQ accordion functionality
const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-150 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-semibold text-[#01376b]">{question}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 text-[#424593] ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="p-4 text-gray-700 text-sm border-t border-gray-100">{answer}</p>
      </div>
    </div>
  );
};

// Component to apply styling for Accordion smooth transition (required for single-file compilation)
const AccordionStyles = () => (
    <style jsx="true">{`
        .max-h-96 { max-height: 24rem; } /* Define max-h-96 */
        .max-h-0 { max-height: 0; }     /* Define max-h-0 */
    `}</style>
);


export default Reserves;
