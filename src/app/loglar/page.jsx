"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Layout from "../components/Layout";

const PanelLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLogs = localStorage.getItem("logs");
      if (savedLogs) setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // AM/PM formatında tarix
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Ay üzrə loglar üçün key
  const getMonthKey = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `logs_${year}-${month}`;
  };

  // CSV nüsxəsi çıxarma (aylıq)
  const exportLogs = () => {
    if (logs.length === 0) return;

    // Bu ayın logları
    const now = new Date();
    const monthKey = getMonthKey(now);
    const monthLogs = logs.filter(l => getMonthKey(l.date) === monthKey);

    if (monthLogs.length === 0) return;

    const csvRows = [
      ["ID","Tip","Ad","Telefon","Ünvan","Bina","Mənzil","Paket","Nov","Texnik","Menbe","Qeyd","Status","Silinmə Vaxtı"],
      ...monthLogs.map(l => [
        l.id,l.tip,l.ad,l.telefon,l.unvan,l.bina,l.menzil,l.paket,l.nov || "-",l.texnik,l.menbe,l.qeyd,l.status, formatDate(l.date)
      ])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${monthKey}.csv`;
    link.click();
  };

  // Logları təmizlə
  const clearLogs = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("logs");
      setLogs([]);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Layout/>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 m-auto">Silinmiş Müraciətlər Logu</h2>
        <div className="space-x-2">
          <button onClick={exportLogs} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Ay üzrə CSV ixrac et
          </button>
          <button onClick={clearLogs} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Logları təmizlə
          </button>
        </div>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-500 mt-4">Hələ heç bir müraciət silinməyib.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm rounded-2xl mt-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {["ID","Tip","Ad","Telefon","Ünvan","Bina","Mənzil","Paket","Nov","Texnik","Menbe","Qeyd","Status","Silinmə Vaxtı"].map((col, i) => (
                  <th key={i} className="p-3 font-medium whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-red-50 transition">
                  <td className="p-3 font-medium text-gray-800">{item.id}</td>
                  <td className="p-3">{item.tip}</td>
                  <td className="p-3">{item.ad}</td>
                  <td className="p-3">{item.telefon}</td>
                  <td className="p-3">{item.unvan}</td>
                  <td className="p-3">{item.bina}</td>
                  <td className="p-3">{item.menzil}</td>
                  <td className="p-3">{item.paket}</td>
                  <td className="p-3">{item.nov || "-"}</td>
                  <td className="p-3">{item.texnik}</td>
                  <td className="p-3">{item.menbe}</td>
                  <td className="p-3">{item.qeyd}</td>
                  <td className="p-3 text-red-600 font-medium">{item.status}</td>
                  <td className="p-3 text-gray-600">{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PanelLogs;
