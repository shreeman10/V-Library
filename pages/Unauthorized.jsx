import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Unauthorized() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center px-4 font-inter relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#3b3b6b 1px, transparent 1px), linear-gradient(90deg, #3b3b6b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-red-600 opacity-10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl w-full">
        {/* 403 Code */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-500 opacity-40" />
          <span className="text-red-500 font-mono text-sm tracking-widest uppercase">
            Error 403
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-500 opacity-40" />
        </div>

        <h1 className="text-8xl md:text-9xl font-black text-white mb-2 leading-none select-none"
          style={{ textShadow: "0 0 60px rgba(239,68,68,0.4)" }}>
          403
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-red-400 mb-4 tracking-tight">
          Access Denied
        </h2>

        <p className="text-gray-400 text-base md:text-lg mb-2 leading-relaxed">
          You don't have permission to access{" "}
          <code className="bg-white/10 text-red-300 px-2 py-0.5 rounded font-mono text-sm">
            /librarian
          </code>
        </p>
        <p className="text-gray-500 text-sm mb-10">
          This area is restricted to <span className="text-red-400 font-semibold">Administrator</span> accounts only.
          Your current session does not have the required privileges.
        </p>

        {/* Status block */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-left font-mono text-xs space-y-1.5">
          <div className="flex gap-3">
            <span className="text-gray-500 select-none">STATUS</span>
            <span className="text-red-400">403 Forbidden</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-500 select-none">PATH&nbsp;&nbsp;</span>
            <span className="text-gray-300">/librarian</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-500 select-none">REASON</span>
            <span className="text-yellow-400">Insufficient role privileges</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-500 select-none">REQD&nbsp;&nbsp;</span>
            <span className="text-green-400">role=admin</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-200"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-red-900/40"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 rounded-lg border border-red-500/40 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-all duration-200"
          >
            Sign in as Admin
          </button>
        </div>

        {/* Countdown */}
        <p className="text-gray-600 text-xs mt-8">
          Redirecting to home in{" "}
          <span className="text-gray-400 font-semibold">{countdown}s</span>
        </p>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 py-3 px-6 flex justify-between items-center text-xs text-gray-700">
        <span>V-Library · VIT Mumbai</span>
        <span>HTTP 403 · Forbidden</span>
      </div>
    </div>
  );
}

export default Unauthorized;
