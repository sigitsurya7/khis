"use client"
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import ListPasien from "./listPasien";
import HistoryPerawatRajal from "./riwayatPerawat";

export default function TabsPerawatRajal(){

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary" radius={"full"}>
                <Tab key="list" title="Daftar Pasien">
                    <ListPasien />
                </Tab>
                <Tab key="history" title="Riwayat Pemeriksaan">
                    <HistoryPerawatRajal />
                </Tab>
            </Tabs>
        </div>
    )
}