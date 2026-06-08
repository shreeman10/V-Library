import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CREDENTIALS from "../passwords.json";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const trimUser = username.trim();
    const trimPass = password.trim();

    // Check admin first, then user
    if (trimUser === CREDENTIALS.admin.username && trimPass === CREDENTIALS.admin.password) {
      sessionStorage.setItem("user", JSON.stringify({
        displayName: CREDENTIALS.admin.displayName,
        role: CREDENTIALS.admin.role,
        username: CREDENTIALS.admin.username,
      }));
      navigate("/");
      return;
    }

    if (trimUser === CREDENTIALS.user.username && trimPass === CREDENTIALS.user.password) {
      sessionStorage.setItem("user", JSON.stringify({
        displayName: CREDENTIALS.user.displayName,
        role: CREDENTIALS.user.role,
        username: CREDENTIALS.user.username,
      }));
      navigate("/");
      return;
    }

    // Invalid
    setError("Invalid username or password. Please try again.");
    triggerShake();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-200 via-cyan-100 to-cyan-200 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Login Form */}
      <div className="flex justify-center items-center flex-grow py-10">
        <div
          className={`bg-white/70 backdrop-blur-md shadow-lg border w-full max-w-md p-8 rounded-xl font-serif transition-all duration-200 ${
            shaking ? "animate-[shake_0.4s_ease]" : ""
          } ${error ? "border-red-400" : "border-gray-300"}`}
          style={shaking ? { animation: "shake 0.4s ease" } : {}}
        >
          <h2 className="text-3xl text-center font-bold mb-2" style={{ color: "red" }}>
            Log In
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Sign in to your V-Library account
          </p>

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-300 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition ${
                  error ? "border-red-400 focus:ring-red-200" : "border-gray-400 focus:ring-blue-300"
                }`}
                required
                autoComplete="username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition ${
                  error ? "border-red-400 focus:ring-red-200" : "border-gray-400 focus:ring-blue-300"
                }`}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="text-right mb-5">
              <a href="#" className="text-red-600 hover:underline text-sm">Forgot Password?</a>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-2 rounded-full transition-all duration-300 w-full"
              >
                Login
              </button>
            </div>
          </form>

        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>

      <Footer />
    </div>
  );
}

export default Login;
