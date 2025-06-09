"use client"
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import MonitoringResepApol from "./monitoringResepApol";
import MonitoringPelayananObatApol from "./monitoringPelObatApol";

export default function TabsMonitoringApol(){

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary" radius={"full"}>
                <Tab key="mResep" title="Monitoring Resep">
                    <MonitoringResepApol />
                </Tab>
                <Tab key="MPObat" title="Monitoring Pelayanan Obat">
                    <MonitoringPelayananObatApol />
                </Tab>
            </Tabs>
        </div>
    )
}