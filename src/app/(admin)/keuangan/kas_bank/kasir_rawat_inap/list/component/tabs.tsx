"use client"
import { Tab, Tabs } from "@heroui/react";
import KasirRawatInapMasihDiRawat from "./daftarMasihDirawat";
import KasirRawatInapProsesKasir from "./prosesKasir";
import KasirRawatInapRevisi from "./revisiKasir";
import RiwayatKasirRawatInap from "./riwayatKasir";

export default function TabsListKasirRawatInap(){

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary" radius={"full"}>
                <Tab key="dirawat" title="Daftar Masih Dirawat">
                    <KasirRawatInapMasihDiRawat />
                </Tab>
                <Tab key="proses_kasir" title="Daftar Proses Kasir">
                    <KasirRawatInapProsesKasir />
                </Tab>
                <Tab key="revisi" title="Daftar Revisi">
                    <KasirRawatInapRevisi />
                </Tab>
                <Tab key="riwayat" title="Riwayat Kasir">
                    <RiwayatKasirRawatInap />
                </Tab>
            </Tabs>
        </div>
    )
}