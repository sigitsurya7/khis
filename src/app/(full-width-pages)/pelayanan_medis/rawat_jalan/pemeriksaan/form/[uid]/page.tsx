import { Metadata } from "next";
import PemeriksaanRajal from "./component/pemeriksaanRajal";

export const metadata: Metadata = {
  title:
    "KHIS | Pemeriksaan Dokter",
  description: "Pemeriksaan Dokter",
};

export default async function formDokter({
  params
}: {
  params: { uid: string }
}) {

  const { uid } = await params
  
  return (
    <PemeriksaanRajal uid={uid} />
  )
}