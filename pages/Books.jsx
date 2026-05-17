import Footer from "../src/components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../src/components/Navbar";

function Books() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of books visible at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const books = [
    { cover: "/Book1.jpeg", hasPdf: true },
    { cover: "/Book2.jpg", hasPdf: true },
    { cover: "/Book3.jpg", hasPdf: true },
    { cover: "/Book4.jpg", hasPdf: true },
    { cover: "/Book5.jpg", hasPdf: true },
    { cover: "/Book6.jpg", hasPdf: false },
    { cover: "/Book7.jpeg", hasPdf: true },
    { cover: "/Book8.jpg", hasPdf: false },
    { cover: "/Book9.jpg", hasPdf: false },
    { cover: "/Book10.jpg", hasPdf: false },
    { cover: "/Book11.jpg", hasPdf: false },
    { cover: "/Book12.jpg", hasPdf: false },
    { cover: "/Book13.jpg", hasPdf: false },
    { cover: "/Book14.jpg", hasPdf: false },
    { cover: "/Book15.jpg", hasPdf: false },
  ];

  return (
    <div className="outer-div bg-[#DFEDF5] min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1">
        <h1
          className="text-5xl md:text-7xl font-pacifico my-6 pl-[75px] pt-[30px]"
          style={{ fontFamily: "Caveat", color: "#605fe6"}}
        >
          Books
        </h1>




        <div className="bg-white rounded-2xl shadow p-8 max-w-[90vw] mx-auto">
  <Slider {...settings}>
    {books.map((book, idx) => {
      const pdfPath = book.cover.replace(/\.(jpe?g|png)$/, ".pdf");
      return (
        <div key={idx} className="flex justify-center items-center relative group">
          <img
            src={book.cover}
            alt={`Book ${idx + 1}`}
            className="h-[250px] w-auto object-contain rounded shadow"
          />
          {/* Overlay */}
          {book.hasPdf ? (
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 text-white font-semibold text-lg rounded transition-opacity"
            >
              Read PDF
            </a>
          ) : (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 text-white font-semibold text-lg rounded transition-opacity">
              No PDF Available
            </div>
          )}
        </div>
      );
    })}
  </Slider>
</div>






        {/* Search Box */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center">
          <div className="w-full md:max-w-2xl">
            <div
              className="bg-white rounded-2xl shadow border border-gray-200 flex flex-col justify-center"
              style={{ minHeight: "320px" }} // <-- Increase the height here as needed
            >
              {/* Heading: reduce height/padding */}
              <div className="flex items-center px-6 py-2 bg-[#00396b] rounded-t-2xl min-h-0">
                <span className="w-4 h-4 bg-yellow-400 rounded mr-3"></span>
                <h2
                  className="text-white text-3xl font-mono font-semibold"
                  style={{ fontFamily: "Caveat" }}
                >
                  Search
                </h2>
              </div>
              {/* Increase search box height */}
              <h3 style={{fontFamily:"Caveat",marginLeft:"80px",marginTop:"75px"}} >Find What You're Looking For :</h3>
              <div className="flex-1 flex flex-col justify-center p-8 pt-[0px]">
                <a href="/search-books">
                  <div
                    className="flex items-center bg-[#f1f7fd] rounded-full border border-gray-300 px-6 cursor-pointer hover:border-blue-500 transition-colors"
                    style={{ height: "54px" }}
                  >
                    <input
                      type="text"
                      placeholder="...for books and ebooks"
                      className="bg-transparent flex-1 outline-none text-lg pointer-events-none"
                      style={{ height: "100%" }}
                      readOnly
                    />
                    <i className="fa-solid fa-magnifying-glass text-gray-500 text-xl ml-2"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
          {/* Course Materials */}
          <div className="w-full md:max-w-sm flex flex-col justify-stretch">
            <div className="bg-white rounded-2xl shadow border border-gray-200 h-full flex flex-col">
              {/* Heading: reduce height/padding */}
              <div className="flex items-center px-6 py-2 bg-[#00396b] rounded-t-2xl min-h-0">
                <span className="w-4 h-4 bg-yellow-400 rounded mr-3"></span>
                <h2
                  className="text-white text-2xl font-mono font-semibold"
                  style={{ fontFamily: "Caveat" }}
                >
                  Course Materials
                </h2>
              </div>
              <div className="p-6 text-gray-800 text-base flex-1">
                Looking for your textbook or other course materials? Try our{" "}
                <a href="#" className="text-blue-600 underline">
                  reserves search
                </a>{" "}
                or your course’s Canvas site.
                <br />
                <br />
                If we don’t have your textbook, you can{" "}
                <a href="#" className="text-blue-600 underline">
                  request that we purchase it.
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* New Materials */}
        <div className="mt-12 w-full md:max-w-[1100px] mx-auto mb-[30px]">
          <div className="bg-white rounded-2xl shadow border border-gray-200">
            {/* Heading: reduce height/padding */}
            <div className="flex items-center px-6 py-2 bg-[#00396b] rounded-t-2xl min-h-0">
              <span className="w-4 h-4 bg-yellow-400 rounded mr-3"></span>
              <h2
                className="text-white text-3xl font-mono font-semibold"
                style={{ fontFamily: "Caveat" }}
              >
                New Materials
              </h2>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-serif mb-4">New Titles</h3>
              <ul className="list-disc list-inside text-lg mb-6">
                <li>
                  <a href="#" className="text-blue-600 underline">
                    All new titles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 underline">
                    New titles by subject
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 underline">
                    New ebooks
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 underline">
                    New popular reading
                  </a>
                </li>
              </ul>
              <h3 className="text-2xl font-serif mb-4">Popular Reading</h3>
              <ul className="list-disc list-inside text-lg">
                <li>
                  <a href="#" className="text-blue-600 underline">
                    All popular reading
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
}

export default Books;
