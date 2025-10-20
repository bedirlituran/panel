"use client";
import React from "react";
import { Menu } from "lucide-react";

const Topbar = ({ onToggleSidebar }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-blue-500 transition"
          >
            <Menu size={22} />
          </button>
          <h1 className="font-semibold text-lg tracking-wide">
            Tele1 — Panel
          </h1>
        </div>



        <button className="bg-white/20 hover:bg-white/30 text-sm px-4 py-1.5 rounded-md transition">
          Çıxış
        </button>
      </div>
    </header>
  );
};

export default Topbar;
