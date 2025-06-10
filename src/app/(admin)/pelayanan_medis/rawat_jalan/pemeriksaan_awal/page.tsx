import { Metadata } from "next";
import TabsPerawatRajal from "./component/tabs";

export const metadata: Metadata = {
  title:
    "KHIS | Pemeriksaan Awal",
  description: "Pemeriksaan Awal",
};

export default function PemeriksaanAwal(){
    return (
        <>
            <TabsPerawatRajal />
        </>
    )
}