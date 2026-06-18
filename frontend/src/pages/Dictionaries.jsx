import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Dictionaries() {

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
      <Navbar />

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
