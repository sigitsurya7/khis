import { Metadata } from "next";
import TabsMonitoringApol from "./component/tabs";

export const metadata: Metadata = {
  title:
    "KHIS | Monitoring Penagihan Apol",
  description: "Monitoring Penagihan Apol",
};

export default function MonitoringApol(){
    return (
        <div>
            <TabsMonitoringApol />
        </div>
    )
}