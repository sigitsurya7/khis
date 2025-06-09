"use client"
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import KasirDaftarPanggilanRajal from "./daftarPanggilanRajal";
import KasirPoliKlinikRajal from "./kasirPoliklinik";
import KasirMcuRajal from "./kasirMcu";
import RiwayatKasirRajal from "./riwayatKasir";

export default function TabsListKasirRawatJalan(){

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary" radius={"full"}>
                <Tab key="list" title="Daftar Panggilan">
                    <KasirDaftarPanggilanRajal />
                </Tab>
                <Tab key="poliklinik" title="Kasir Poliklinik">
                    <KasirPoliKlinikRajal />
                </Tab>
                <Tab key="mcu" title="Kasir MCU">
                    <KasirMcuRajal />
                </Tab>
                <Tab key="riwayat" title="Riwayat Kasir">
                    <RiwayatKasirRajal />
                </Tab>
            </Tabs>
        </div>
    )
}