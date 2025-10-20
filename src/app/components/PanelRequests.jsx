"use client";
import React, { useState, useEffect } from "react";
import { MoreVertical, X, Edit } from "lucide-react";

const inputClass =
  "border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-sm";

const problemOptions = [
  "Siqnal zəifdir",
  "Xətt işləmir",
  "Modemin yeri dəyişilsin",
  "Kabel dəyişilsin",
  "Qutunun yeri blokda dəyişilsin",
  "Sürət zəifdir",
  "5G itir",
  "TV işləmir",
  "Digər problem"
];

const menbeOptions = ["Zəng", "WhatsApp", "Sayt", "Digər"];

const PanelRequestsLocal = () => {
  const [formData, setFormData] = useState({
    tip: "Qoşulma",
    ad: "",
    telefon: "",
    unvan: "",
    bina: "",
    menzil: "",
    paket: "",
    nov: "",
    texnik: "",
    menbe: "",
    qeyd: "",
  });

  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("muracietler");
      if (saved) setSubmissions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("muracietler", JSON.stringify(submissions));
    }
  }, [submissions]);

  const generateId = (tip) => {
    const filtered = submissions.filter((s) => s.tip === tip);
    const nextNumber = filtered.length + 1;
    return tip === "Qoşulma"
      ? `Q${String(nextNumber).padStart(2, "0")}`
      : `P${String(nextNumber).padStart(2, "0")}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.texnik) {
      setError("Texnik mütləqdir");
      return;
    }
    if (formData.tip === "Problem" && !formData.nov) {
      setError("Problem tipidirsə 'Problem növü' seçilməlidir");
      return;
    }

    const now = new Date();
    const autoDate = now.toISOString().split("T")[0];
    const autoTime = now.toTimeString().split(" ")[0].slice(0,5);

    if (isEditMode && currentItem) {
      const updatedSubmissions = submissions.map((item) =>
        item.id === currentItem.id
          ? { ...formData, id: currentItem.id, status: currentItem.status, tarix: item.tarix, saat: item.saat }
          : item
      );
      setSubmissions(updatedSubmissions);
      setIsEditMode(false);
      setCurrentItem(null);
    } else {
      const newItem = {
        ...formData,
        id: generateId(formData.tip),
        status: "Gözləmədə",
        tarix: autoDate,
        saat: autoTime
      };
      setSubmissions([newItem, ...submissions]);
    }

    setFormData({
      tip: "Qoşulma",
      ad: "",
      telefon: "",
      unvan: "",
      bina: "",
      menzil: "",
      paket: "",
      nov: "",
      texnik: "",
      menbe: "",
      qeyd: "",
    });
  };

  const openActionModal = (item) => {
    setCurrentItem(item);
    setSelectedAction("");
    setIsModalOpen(true);
  };

  const handleActionConfirm = () => {
    if (!currentItem || !selectedAction) return;

    const updatedSubmissions = submissions.map((i) => {
      if (i.id === currentItem.id) {
        switch (selectedAction) {
          case "1":
            return { ...i, status: "Qoşuldu" };
          case "2":
            return { ...i, status: "Problem həll oldu" };
          case "3":
            return { ...i, status: "Mən götürdüm (texnikada)" };
          case "4":
            if (typeof window !== "undefined") {
              const logs = JSON.parse(localStorage.getItem("logs") || "[]");
              logs.unshift({ ...i, date: new Date().toLocaleString() });
              localStorage.setItem("logs", JSON.stringify(logs));
            }
            return null;
          default:
            return i;
        }
      }
      return i;
    }).filter(Boolean);

    setSubmissions(updatedSubmissions);
    setIsModalOpen(false);
    setCurrentItem(null);
    setSelectedAction("");
  };

  const startEdit = (item) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setFormData(item);
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-white shadow-sm rounded-2xl p-5 md:p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{isEditMode ? "Müraciəti redaktə et" : "Yeni müraciət"}</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-4" onSubmit={handleSubmit}>
          <select name="tip" value={formData.tip} onChange={handleChange} className={inputClass}>
            <option value="Qoşulma">Qoşulma</option>
            <option value="Problem">Problem</option>
          </select>
          <input type="text" name="ad" placeholder="Ad" value={formData.ad} onChange={handleChange} className={inputClass} />
          <input type="tel" name="telefon" placeholder="+994 50xxxxxxx" value={formData.telefon} onChange={handleChange} className={inputClass} />
          <input type="text" name="unvan" placeholder="Ünvan (küçə)" value={formData.unvan} onChange={handleChange} className={inputClass} />
          <input type="text" name="bina" placeholder="Bina №" value={formData.bina} onChange={handleChange} className={inputClass} />
          <input type="text" name="menzil" placeholder="Mənzil №" value={formData.menzil} onChange={handleChange} className={inputClass} />
          <select name="paket" value={formData.paket} onChange={handleChange} className={inputClass}>
            <option value="">Paket</option>
            <option value="50 Mbit + TV">50 Mbit + TV</option>
            <option value="100 Mbit + TV">100 Mbit + TV</option>
            <option value="300 Mbit + TV">300 Mbit + TV</option>
          </select>

          {/* Problem nov */}
          {formData.tip === "Problem" && (
            <select name="nov" value={formData.nov} onChange={handleChange} className={inputClass}>
              <option value="">Problem növü</option>
              {problemOptions.map((p, idx) => <option key={idx} value={p}>{p}</option>)}
            </select>
          )}

          {/* Menbe select */}
          <select name="menbe" value={formData.menbe} onChange={handleChange} className={inputClass}>
            <option value="">Menbe</option>
            {menbeOptions.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
          </select>

          <input type="text" name="texnik" placeholder="Texnik (Mütləq)" value={formData.texnik} onChange={handleChange} className={inputClass} />
          <input type="text" name="qeyd" placeholder="Qeyd" value={formData.qeyd} onChange={handleChange} className={inputClass} />

          <button type="submit" className="col-span-1 sm:col-span-2 lg:col-span-1 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            {isEditMode ? "Yadda saxla" : "Əlavə et"}
          </button>
        </form>
      </div>

      {/* Table */}
      {submissions.length > 0 && (
        <div className="bg-white shadow-sm rounded-2xl overflow-x-auto mt-6">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {["ID","Tip","Ad","Telefon","Ünvan","Bina","Mənzil","Paket","Nov","Texnik","Menbe","Tarix","Saat","Qeyd","Status","Əməliyyat"].map((col, i) => (
                  <th key={i} className="p-3 font-medium whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.id} className="border-t hover:bg-blue-50 transition">
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
                  <td className="p-3">{item.tarix}</td>
                  <td className="p-3">{item.saat}</td>
                  <td className="p-3">{item.qeyd}</td>
                  <td className="p-3 text-blue-700 font-medium">{item.status}</td>
                  <td className="p-3 flex items-center space-x-2">
                    <button onClick={() => startEdit(item)} className="text-gray-600 hover:text-gray-800"><Edit size={16} /></button>
                    <button onClick={() => openActionModal(item)} className="text-gray-600 hover:text-gray-800"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 md:w-1/2 relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Əməliyyat seçin</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="radio" name="action" value="1" checked={selectedAction==="1"} onChange={(e)=>setSelectedAction(e.target.value)} />
                <span>Qoşuldu</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="action" value="2" checked={selectedAction==="2"} onChange={(e)=>setSelectedAction(e.target.value)} />
                <span>Problem həll oldu</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="action" value="3" checked={selectedAction==="3"} onChange={(e)=>setSelectedAction(e.target.value)} />
                <span>Mən götürdüm (texnikada)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="action" value="4" checked={selectedAction==="4"} onChange={(e)=>setSelectedAction(e.target.value)} />
                <span>Sil</span>
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={handleActionConfirm} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">OK</button>
              <button onClick={()=>setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition">Ləğv et</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelRequestsLocal;
