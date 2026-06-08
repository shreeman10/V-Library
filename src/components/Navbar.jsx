import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUserCircle, FaChevronDown, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  // Read user from sessionStorage on mount + listen for storage changes
  useEffect(() => {
    const load = () => {
      const stored = sessionStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    load();
    window.addEventListener('storage', load);
    // Also poll briefly after navigation so login redirect updates navbar
    const interval = setInterval(load, 500);
    return () => {
      window.removeEventListener('storage', load);
      clearInterval(interval);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <div className="navbar bg-[#424593] px-4 md:px-8 flex items-center sticky top-0 z-50 w-full">
        <div className="logo pr-4 md:pr-8 py-2 shrink-0">
          <Link to="/" className="cursor-pointer">
            <img src="/Logo-VIT.png" alt="VIT Logo" className="h-15 w-auto" />
          </Link>
        </div>

        {/* Desktop nav links (Only shown if logged in) */}
        {user && (
          <div className="hidden md:flex flex-1 items-center gap-x-8">
            <Link to="/dashboard" className="text-white hover:text-blue-300 text-lg transition-colors"><u>Dashboard</u></Link>
            <Link to="/books" className="text-white hover:text-blue-300 text-lg transition-colors"><u>Books</u></Link>
            <Link to="/journals" className="text-white hover:text-blue-300 text-lg transition-colors"><u>Journals</u></Link>
            <Link to="/guides" className="text-white hover:text-blue-300 text-lg transition-colors"><u>Guides</u></Link>
            <Link to="/magazines" className="text-white hover:text-blue-300 text-lg transition-colors"><u>Magazines</u></Link>
            <Link to="/dictionaries" className="text-white hover:text-blue-300 text-lg transition-colors"><u>Dictionaries</u></Link>
            <Link to="/search-books" className="text-white hover:text-blue-300 text-lg transition-colors"><u>Search Books</u></Link>
            <Link to="/reserves" className="text-white hover:text-blue-300 text-lg transition-colors"><u>Reserves</u></Link>
          </div>
        )}

        {/* Desktop right side (Only shown if logged in) */}
        {user ? (
          /* ── Logged-in dropdown ── */
          <div className="hidden md:flex items-center ml-auto gap-3">
            <FaSearch className="text-white text-lg" />
            <div className="h-8 w-px bg-white/40 mx-1" />

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 group"
                id="user-menu-btn"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md
                  ${isAdmin ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-400 to-indigo-600'}`}>
                  {isAdmin ? 'A' : 'U'}
                </div>
                <span className="text-white font-semibold text-sm tracking-wide">
                  {isAdmin ? 'Admin' : 'User'}
                </span>
                {isAdmin && (
                  <span className="text-[10px] font-bold bg-amber-400 text-amber-900 px-1.5 py-0.5 rounded-full leading-none">
                    ADMIN
                  </span>
                )}
                <FaChevronDown
                  className={`text-white/70 text-xs transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50
                  animate-[fadeSlide_0.15s_ease]">
                  {/* Header */}
                  <div className={`px-4 py-3 ${isAdmin ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100'}`}>
                    <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                    <p className={`text-sm font-bold ${isAdmin ? 'text-orange-700' : 'text-indigo-700'}`}>
                      {isAdmin ? '⚡ Administrator' : '👤 User'}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    {/* Profile — both roles */}
                    <button
                      onClick={() => { setDropdownOpen(false); navigate('/select'); }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaUser className="text-gray-400 w-3.5 h-3.5" />
                      Profile
                    </button>

                    {/* Manage — admin only */}
                    {isAdmin && (
                      <button
                        onClick={() => { setDropdownOpen(false); navigate('/librarian'); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 transition-colors font-medium"
                      >
                        <FaCog className="text-amber-500 w-3.5 h-3.5" />
                        Manage
                        <span className="ml-auto text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
                          ADMIN
                        </span>
                      </button>
                    )}

                    <div className="border-t border-gray-100 my-1" />

                    {/* Logout — both roles */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="text-red-400 w-3.5 h-3.5" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── Not logged in: show Log in link on both desktop and mobile ── */
          <div className="ml-auto">
            <Link to="/login" className="text-white hover:text-blue-300 text-lg transition-colors">
              <u>Log in</u>
            </Link>
          </div>
        )}

        {/* Hamburger (mobile, only when logged in) */}
        {user && (
          <button
            className="flex flex-col justify-center items-center md:hidden ml-auto h-10 w-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#424593] w-full flex flex-col items-center z-40 sticky top-[70px]">
          {[
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/books', label: 'Books' },
            { to: '/journals', label: 'Journals' },
            { to: '/guides', label: 'Guides' },
            { to: '/magazines', label: 'Magazines' },
            { to: '/dictionaries', label: 'Dictionaries' },
            { to: '/search-books', label: 'Search Books' },
            { to: '/reserves', label: 'Reserves' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-blue-300 py-2 text-lg w-full text-center border-b border-blue-200/30"
            >
              <u>{label}</u>
            </Link>
          ))}

          <div className="border-t border-white/20 w-full" />

          {user ? (
            <div className="flex flex-col items-center gap-2 py-3 w-full text-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold text-white mx-auto
                ${isAdmin ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-400 to-indigo-600'}`}>
                {isAdmin ? 'A' : 'U'}
              </div>
              <span className="text-white font-semibold text-sm">{isAdmin ? 'Admin' : 'User'}</span>

              <button
                onClick={() => { setMenuOpen(false); navigate('/select'); }}
                className="text-white/80 hover:text-white text-sm py-1"
              >
                Profile
              </button>

              {isAdmin && (
                <button
                  onClick={() => { setMenuOpen(false); navigate('/librarian'); }}
                  className="text-amber-300 hover:text-amber-200 text-sm py-1 font-medium"
                >
                  ⚙ Manage
                </button>
              )}

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 text-sm py-1"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-blue-300 py-3 text-lg w-full text-center"
            >
              <u>Log in</u>
            </Link>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default Navbar;