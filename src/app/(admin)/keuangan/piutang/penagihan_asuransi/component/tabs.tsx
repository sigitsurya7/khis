"use client"
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import DaftarPenARajal from "./dRajal";
import DaftarPenARanap from "./dRanap";
import DaftarPenATagihan from "./dTagihan";
import DaftarPenASelesai from "./dSelesai";

export default function TabsPenagihanAsuransi(){

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary" radius={"full"}>
                <Tab key="dRajal" title="Daftar Piutang Rajal">
                    <DaftarPenARajal />
                </Tab>
                <Tab key="dRanap" title="Daftar Piutang Ranap">
                    <DaftarPenARanap />
                </Tab>
                <Tab key="dTagihan" title="Daftar Tagihan">
                    <DaftarPenATagihan />
                </Tab>
                <Tab key="selesai" title="Selesai">
                    <DaftarPenASelesai />
                </Tab>
            </Tabs>
        </div>
    )
}