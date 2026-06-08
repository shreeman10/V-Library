import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SelectPage from "../pages/SelectPage";
import Login from "../pages/Login";
import Books from "../pages/Books";
import Journals from "../pages/Journals";
import Guides from "../pages/Guides";
import Dashboard from "../pages/Dashboard";
import LibrarianPage from "../pages/LibrarianPage";
import Confirmation from "../pages/ConfirmPage";
import Unauthorized from "../pages/Unauthorized";
import './App.css'
import './index.css';
import Magazines from "../pages/Magazines";
import Dictionaries from "../pages/Dictionaries";
import Reserves from "../pages/Reserves";
import SearchBooks from "../pages/SearchBooks";
import AIAssistant from "./components/AIAssistant";

// Guard: only admin role can pass through
function AdminRoute({ children }) {
  const stored = sessionStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;

  if (!user) {
    // Not logged in at all — redirect to login
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    // Logged in but not admin — show 403
    return <Unauthorized />;
  }

  return children;
}

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/select" element={<SelectPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/books" element={<Books/>} />
          <Route path="/journals" element={<Journals/>} />
          <Route path="/guides" element={<Guides/>} />
          <Route path="/magazines" element={<Magazines/>} />
          <Route path="/dictionaries" element={<Dictionaries/>} />
          <Route path="/search-books" element={<SearchBooks/>} />
          <Route path="/reserves" element={<Reserves/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/confirm" element={<Confirmation/>} />
          <Route path="/unauthorized" element={<Unauthorized/>} />

          {/* Protected — admin only */}
          <Route
            path="/librarian"
            element={
              <AdminRoute>
                <LibrarianPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
      <AIAssistant />
    </>
  )
}

export default App;
