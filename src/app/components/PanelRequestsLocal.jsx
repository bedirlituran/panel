"use client";
import React, { useState, useEffect } from "react";
import LoginPage from "../components/LoginPage";
import PanelRequestsLocal from "../components/PanelRequestsLocal";

const Page = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const cookieRole = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1];
    if (cookieRole) setRole(cookieRole);
  }, []);

  if (!role) {
    return <LoginPage onLogin={(r) => setRole(r)} />;
  }

  return <PanelRequestsLocal role={role} />;
};

export default Page;
