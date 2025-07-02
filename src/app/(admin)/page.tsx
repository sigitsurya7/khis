import Dashboard from "@/components/dashboard/Dashboard";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "KHIS | Koala Hospital Information System",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};
export default function Ecommerce() {

  return (
    <Dashboard />
  );
}
