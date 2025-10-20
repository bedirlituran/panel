"use client";
import React from "react";
import { X } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
const links = [
  { name: "Müraciətlər", href: "/muracietler" },
  { name: "İdarəetmə", href: "/idareetme" },
  { name: "Loglar (silinənlər)", href: "/loglar" },
];

  return (
    <>
      {/* Mobil görünüş üçün overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b md:hidden">
          <h2 className="font-semibold text-blue-600">Menyu</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link, i) => (
         <a
  key={i}
  href={link.href}
  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition"
>
  {link.name}
</a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
