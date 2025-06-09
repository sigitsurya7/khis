import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};
export default function Ecommerce() {

  return (
    <div className="grid grid-cols-1 gap-4">
      <span>Greeting, halo ( nama user )</span>

      <span>Ada Notifikasi semisal dia punya konsul dan harus jawab konsul jadi jawab konsul bisa dari dashboard aja</span>
    </div>
  );
}
