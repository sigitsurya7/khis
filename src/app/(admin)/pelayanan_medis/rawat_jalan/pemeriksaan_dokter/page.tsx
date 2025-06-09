import { Metadata } from "next";
import TabsRawatJalan from "./component/tabs";

export const metadata: Metadata = {
  title:
    "KHIS | Pemeriksaan Dokter",
  description: "Pemeriksaan Dokter",
};

export default function PemeriksaanDokter(){

  return (
    <div className="">
        <TabsRawatJalan dokter_id="1" />
    </div>
  )
}