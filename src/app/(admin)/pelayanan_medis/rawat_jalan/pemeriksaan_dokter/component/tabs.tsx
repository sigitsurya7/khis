"use client"
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import ListDokterRajal from "./listDokter";
import HistoryDokterRajal from "./historyDokter";

interface TabsRawatJalanProps {
  dokter_id?: string;
}

export default function TabsRawatJalan({ dokter_id }: TabsRawatJalanProps){

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary" radius={"full"}>
                <Tab key="list" title="Daftar Dokter">
                    <ListDokterRajal />
                </Tab>
                <Tab key="history" title="Riwayat Pemeriksaan">
                    <HistoryDokterRajal />
                </Tab>
            </Tabs>
        </div>
    )
}