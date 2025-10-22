"use client";
import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        document.cookie = `role=${data.role}; path=/`;
        onLogin?.(data.role);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Serverə qoşulmaq mümkün olmadı!");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          Giriş səhifəsi
        </h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Giriş edilir..." : "Daxil ol"}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p><b>Admin:</b> admin@boss.az / 12345</p>
          <p><b>İstifadəçi:</b> user@boss.az / 12345</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
